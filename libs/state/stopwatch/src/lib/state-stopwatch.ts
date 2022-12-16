import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface StateStopwatch {
  current: number
  status: 'stop' | 'play' | 'pause'
  start: () => void
  pause: () => void
  stop: () => void
  toggle: () => void
}

let refTimer = 0
let start = 0

export const useStateStopwatch = create(persist<StateStopwatch>((set, get) => ({
  current: 0,
  status: 'stop',
  start: () => {
    const { current } = get()
    const d = Date.now()
    start = d - current,
    set({ status: 'play' })
    onTimer()
  },
  pause: () => {
    window.cancelAnimationFrame(refTimer)
    set({ status: 'pause' })
  },
  stop: () => {
    window.cancelAnimationFrame(refTimer)
    start = 0
    set({ current: 0, status: 'stop' })
  },
  toggle: () => {
    const { start, pause, status } = get()
    if (status === 'play') {
      pause()
    } else {
      start()
    }
  }
})))

const onTimer = () => {
  const { getState, setState } = useStateStopwatch
  const { status } = getState()

  if (status !== 'play') return

  refTimer = requestAnimationFrame(() => {
    const d = Date.now()
    setState({ current: d - start })
    onTimer()
  })
}
