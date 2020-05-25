import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.less'
import { formatNodes } from '@/pure/graph'
import Tools from './Tools'
import Stage from './Stage'
import DragBox from './DragBox'

export default function Graph(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    const { nodes, edges } = props
    const formattedNodes = formatNodes(nodes)
    dispatch.graph.updateWithBackup({ nodes: formattedNodes, edges })
    // dispatch.graph.update({ nodes: formattedNodes, edges })
    return () => {
      dispatch.graph.reset()
    }
  }, [dispatch.graph, props])
  return (
    <div className='graph'>
      <DragBox />
      <Tools />
      <Stage />
    </div>
  )
}
