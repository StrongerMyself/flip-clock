import create from 'zustand'
import { persist } from 'zustand/middleware'

interface StateApp {
  slide: number
  setSlide: (slide: number) => void
}

export const useStateApp = create(persist<StateApp>((set) => ({
  slide: 0,
  setSlide: (slide) => set({ slide })
}), { name: 'state-app' }))

export const selectStateApp = (state: StateApp) => ({
  slide: state.slide,
  setSlide: state.setSlide,
})
