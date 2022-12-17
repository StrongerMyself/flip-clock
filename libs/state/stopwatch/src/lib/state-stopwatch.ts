import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface StateStopwatch {
  start: number
  current: number
  status: 'stop' | 'play' | 'pause'
  play: () => void
  pause: () => void
  stop: () => void
  toggle: () => void
  loop: () => void
}

let refTimer = 0

export const useStateStopwatch = create(persist<StateStopwatch>((set, get) => ({
  start: 0,
  current: 0,
  status: 'stop',
  play: () => {
    const { current, loop } = get()
    const d = Date.now()
    set({ start: d - current, status: 'play' })
    loop()
  },
  pause: () => {
    window.cancelAnimationFrame(refTimer)
    set({ status: 'pause' })
  },
  stop: () => {
    window.cancelAnimationFrame(refTimer)
    set({ start: 0, current: 0, status: 'stop' })
  },
  toggle: () => {
    const { play, pause, status } = get()
    if (status === 'play') {
      pause()
    } else {
      play()
    }
  },
  loop: () => {
    refTimer = requestAnimationFrame(() => {
      const { start, status, loop } = get()
      if (status == 'play') {
        const d = Date.now()
        set({ current: d - start })
        loop()
      }
    })
  }
}), { name: 'state-stopwatch' }))

export const selectStateStopwatch = (state: StateStopwatch) => ({
  current: state.current,
  status: state.status,
  play: state.play,
  pause: state.pause,
  stop: state.stop,
  toggle: state.toggle,
  loop: state.loop,
})
