import { useState } from "react";

export const openFullscreen = () => {
  const elem = document.documentElement;
  const webkitRequestFullscreen = (elem as any).webkitRequestFullscreen
  elem.requestFullscreen || webkitRequestFullscreen;
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (webkitRequestFullscreen) {
    webkitRequestFullscreen()
  }
}

export const closeFullscreen = () => {
  const webkitExitFullscreen = (document as any).webkitExitFullscreen
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (webkitExitFullscreen) {
    webkitExitFullscreen()
  }
}

export const useToggleFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (isFullscreen) {
      closeFullscreen?.()
    } else {
      openFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return { isFullscreen, toggleFullscreen }
}
