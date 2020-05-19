import React from 'react'
import Node from './Node'
import './index.less'

export default function Nodes(props) {
  const { data } = props
  return (
    <g className='nodes-container'>
      {data.map(node => <Node key={node.id} data={node} />)}
    </g>
  )
}
