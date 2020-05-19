import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.less'
import Tools from './Tools'
import Stage from './Stage'
import { formatNodes } from '@/pure/graph'

export default function Graph(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    const { nodes, edges, children, ...restProps } = props
    const formattedNodes = formatNodes(nodes)
    dispatch.graph.init({ ...restProps, nodes: formattedNodes, edges })
  }, [dispatch.graph, props])
  return (
    <div className='graph'>
      <Tools />
      <Stage />
      {props.children}
    </div>
  )
}
