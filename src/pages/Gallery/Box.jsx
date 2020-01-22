import React from 'react'

export default function Box(props) {
  const { src, text = '', style = {}, onClick, onLoad } = props
  return (
    <div style={style} className='box'>
      <div className='wrapper'>
        <div className='pic'>
          <img src={src} alt={src} onLoad={() => onLoad()} onError={() => onLoad()} />
        </div>
        <div className='text' onClick={onClick}>{text}</div>
      </div>
    </div>
  )
}
