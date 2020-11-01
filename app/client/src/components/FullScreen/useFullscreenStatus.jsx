import React from "react"

const useFullscreenStatus = (elRef) => {
  const [isFullscreen, setIsFullscreen] = React.useState(
    document[getBrowserFullscreenElementProp()] != null
  )

  const setFullscreen = () => {
    if (elRef.current == null) return

    const requestFullScreen = elRef.requestFullscreen || elRef.mozRequestFullScreen || elRef.webkitRequestFullScreen || elRef.msRequestFullscreen
    // const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
    
    requestFullScreen
      .call(requestFullScreen)
      .then(() => {
        setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
      })
      .catch(() => {
        setIsFullscreen(false)
      })
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)

    return () => (document.onfullscreenchange = undefined)
  })

  return [isFullscreen, setFullscreen]
}

export default useFullscreenStatus

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } else if (typeof document.mozFullScreenElement !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof document.msFullscreenElement !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof document.webkitFullscreenElement !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    throw new Error("fullscreenElement is not supported by this browser")
  }
}