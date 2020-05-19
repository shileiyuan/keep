import React from 'react'
import Edge from './Edge'
import './index.less'

export default function Edges(props) {
  return (
    <g className='edges-container'>
      {
        props.data.map(edge => <Edge key={edge.id} data={edge} />)
      }
    </g>
  )
}
