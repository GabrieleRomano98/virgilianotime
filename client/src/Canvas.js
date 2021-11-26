import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const { draw, running, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let animationFrameId
    
    const render = () => {
      if(running)
        draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw, running])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas