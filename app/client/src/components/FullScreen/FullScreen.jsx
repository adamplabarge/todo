import React from "react"
import useFullscreenStatus from "./useFullscreenStatus"

const FullScreen = ({ children, backgroundColor }) => {
  const fullScreenElm = React.useRef(null)
  let isFullscreen
  let setIsFullscreen
  let errorMessage

  try {
    ;[isFullscreen, setIsFullscreen] = useFullscreenStatus(fullScreenElm)
  } catch (e) {
    errorMessage = "Fullscreen not supported"
    isFullscreen = false
    setIsFullscreen = undefined
  }

  const handleExitFullscreen = () => document.exitFullscreen()

  const childrenWithProps = React.Children.map(children, child => {
    const props = {
      isFullscreen,
      setIsFullscreen,
      handleExitFullscreen,
      fullScreenErrorMessage: errorMessage
    }
    if (React.isValidElement(child)) {
        return React.cloneElement(child, props)
    }
    return child
  })

  return (
    <div
      ref={fullScreenElm}
      className={`fullscreen-container ${
        isFullscreen ? "fullscreen" : "default"
      }`}
      style={{ backgroundColor: isFullscreen ? backgroundColor : null }}
    >
      <div className="fullscreen-content">
        {childrenWithProps}
      </div>
    </div>
  )
}

export default FullScreen