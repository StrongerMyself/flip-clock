import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface StateTimer {
  status: 'stop' | 'play' | 'pause' | 'final'
  start: number
  current: number
  duration: number
  selfDuration: number,
  setDuration: (duration: number) => void
  play: (start?: number) => void
  pause: () => void
  reset: () => void
  toggle: () => void
  loop: () => void
}

let refTimer = 0

export const useStateTimer = create(persist<StateTimer>((set, get) => ({
  status: 'stop',
  start: 0,
  current: 0,
  duration: 0,
  selfDuration: 0,
  setDuration: (duration) => set({
    status: 'stop',
    current: duration,
    duration,
    selfDuration: duration
  }),
  play: () => {
    const { loop } = get()
    const d = Date.now()
    set({ start: d, status: 'play' })
    loop()
  },
  pause: () => {
    window.cancelAnimationFrame(refTimer)
    set((state) => ({ status: 'pause', duration: state.current }))
  },
  reset: () => {
    window.cancelAnimationFrame(refTimer)
    set((state) => ({
      current: state.selfDuration,
      duration: state.selfDuration,
      status: 'stop'
    }))
  },
  toggle: () => {
    const { loop, pause, status } = get()
    if (status === 'play') {
      pause()
    } else {
      set({ status: 'play' })
      loop()
    }
  },
  loop: () => {
    refTimer = requestAnimationFrame(() => {
      const { start, duration, selfDuration, status, loop } = get()
      if (status !== 'play') return 
      const d = Date.now()
      const diff = d - start
      const nextCurrent = duration - diff
      if (nextCurrent <= 0) {
        set({ current: 0, status: 'final', duration: selfDuration })
        return 
      }
      set({ current: nextCurrent })
      loop()
    })
  },
}), { name: 'state-timer' }))

useStateTimer.getState().setDuration(10000)

export const selectStateTimer = (state: StateTimer) => ({
  status: state.status,
  current: state.current,
  duration: state.duration,
  setDuration: state.setDuration,
  play: state.play,
  pause: state.pause,
  reset: state.reset,
  toggle: state.toggle,
  loop: state.loop,
})