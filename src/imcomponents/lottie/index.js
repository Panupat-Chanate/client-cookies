import React from "react"
import Lottie from "react-lottie"

export default ({
  height,
  width,
  animationData,
  loop = true,
  autoplay = true
}) => {
  return (
    <Lottie
      options={{
        loop,
        autoplay,
        animationData: require(`./${animationData}`),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }}
      height={height}
      width={width}
    />
  )
}
