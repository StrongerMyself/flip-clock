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
  load: () => void
}

let refTimer = 0

export const useStateStopwatch = create(persist<StateStopwatch>((set, get) => ({
  start: 0,
  current: 0,
  status: 'stop',
  play: () => {
    const { current } = get()
    const d = Date.now()
    set({ start: d - current, status: 'play' })
    onTimer()
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
  load: () => {
    onTimer()
  }
}), { name: 'state-stopwatch' }))

const onTimer = () => {
  const { getState, setState } = useStateStopwatch
  const { status } = getState()

  if (status !== 'play') return

  refTimer = requestAnimationFrame(() => {
    const d = Date.now()
    setState((state) => ({ current: d - state.start }))
    onTimer()
  })
}

export const selectStateStopwatch = (state: StateStopwatch) => ({
  current: state.current,
  status: state.status,
  play: state.play,
  pause: state.pause,
  stop: state.stop,
  toggle: state.toggle,
  load: state.load,
})
