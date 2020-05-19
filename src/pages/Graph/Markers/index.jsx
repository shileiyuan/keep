import React from 'react'

const ARROW_PATH = 'M6,4 L9,6 L6,8 Z'

export default function Markers(props) {
  const markers = [
    { id: 'arrow', color: '#BBC1CB' },
    { id: 'arrow-selected', color: '#569CFF' },
    { id: 'arrow-red', color: 'red' }
  ]
  return (
    <defs>
      {
        markers.map(({ id, color }) => (
          <marker
            key={id}
            id={id}
            markerWidth='15'
            markerHeight='15'
            viewBox='0 0 10 10'
            refX='8.5'
            refY='6'
            orient='auto'
          >
            <path d={ARROW_PATH} fill={color} />
          </marker>
        ))
      }
    </defs>
  )
}
