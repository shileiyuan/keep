import React, { useRef, useCallback } from 'react'
import cls from 'classnames'
import { useDispatch } from 'react-redux'
import useSelector from '@/hooks/useShallowEqualSelector'
import { getEdgePath } from '@/pure/graph'

export default function Edge(props) {
  const { data } = props
  const dispatch = useDispatch()
  const { nodes, selectedEdges } = useSelector('graph', ['nodes', 'selectedEdges'])
  const ref = useRef()
  const pathStr = getEdgePath(nodes, data)

  const selectEdges = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'UPDATE', payload: { selectedEdges: [data] } })
    },
    [data, dispatch]
  )
  const isSelected = selectedEdges.some(edge => edge.id === data.id)
  return (
    <g onClick={selectEdges}>
      <path
        className={cls('edge', { 'edge-selected': isSelected })}
        ref={ref}
        d={pathStr}
        markerEnd='url(#arrow-red)'
      />
      {/* 这条线用来把线的宽度变大，以方便用户点击 */}
      <path className='edge-bg' d={pathStr} fill='none' />
    </g>
  )
}
