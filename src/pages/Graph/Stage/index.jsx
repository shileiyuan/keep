import React, { useRef, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import R from 'ramda'
import useSelector from '@/hooks/useShallowEqualSelector'
import Nodes from '../Nodes'
import Edges from '../Edges'
import Auxiliary from '../Auxiliary'
import Markers from '../Markers'

export default function Stage() {
  const ref = useRef()
  const auxiliaryRef = useRef()
  const dispatch = useDispatch()
  const { nodes, edges } = useSelector('graph', ['nodes', 'edges'])

  const emptySelect = useCallback(
    () => {
      dispatch.graph.update({
        selectedNodes: [],
        selectedEdges: []
      })
    },
    [dispatch.graph]
  )

  useEffect(() => {
    const svg = d3.select(ref.current)

    // 把 auxiliary 中的辅助元素添加到svgInfo中
    const auxiliarys = R.reduce(
      (acc, { id }) => R.assoc(id, svg.select(`#${id}`), acc),
      {},
      auxiliaryRef.current.childNodes
    )

    // pan-and-zoom
    const zoomArea = svg.select('.zoom-area')

    // zoom代表一个缩放行为
    const zoom = d3.zoom().scaleExtent([1 / 5, 4]).on('zoom', () => {
      zoomArea.attr('transform', d3.event.transform)
    })

    // 取消双击缩放事件
    svg.call(zoom).on('dblclick.zoom', null)

    const svgInfo = {
      ...auxiliarys,
      svg,
      svgDOM: ref.current,
      zoom
    }

    dispatch.graph.update({ svgInfo })
  }, [dispatch])
  return (
    <svg
      className='graph-stage'
      ref={ref}
      onClick={emptySelect}
    >
      <Markers />
      <g className='zoom-area'>
        <Nodes data={nodes} />
        <Edges data={edges} />
        <Auxiliary ref={auxiliaryRef} />
      </g>
    </svg>
  )
}
