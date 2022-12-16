import create from 'zustand'
import { persist } from 'zustand/middleware'

interface StateApp {
  scrollTop: number
  onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

export const useStateApp = create(persist<StateApp>(() => ({
  scrollTop: 0,
  onScroll: (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { setState } = useStateApp
    const elem = event.currentTarget as HTMLDivElement
    setState({ scrollTop: elem.scrollTop })
  }
}), { name: 'state-app' }))

export const selectStateApp = (state: StateApp) => ({
  scrollTop: state.scrollTop,
  onScroll: state.onScroll,
})
