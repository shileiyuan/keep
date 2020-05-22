import React, { useMemo, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { useDispatch } from 'react-redux'
import useSelector from '@/hooks/useShallowEqualSelector'
import uuid from '@/utils/uuid'
import { getAbsNodeFromTree } from '@/pure/graph'

const CONNECT_DIRECTION = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT'
}

let targetInfo = null

export default function ConnectAnchors(props) {
  const { svgInfo, edges, nodes } = useSelector('graph', ['svgInfo', 'edges', 'nodes'])
  const dispatch = useDispatch()
  const { width, height, id } = props.data

  const anchorsRef = useRef()

  const list = useMemo(() => ([
    { x: width / 2, y: 0, direct: CONNECT_DIRECTION.TOP },
    { x: width, y: height / 2, direct: CONNECT_DIRECTION.RIGHT },
    { x: width / 2, y: height, direct: CONNECT_DIRECTION.BOTTOM },
    { x: 0, y: height / 2, direct: CONNECT_DIRECTION.LEFT }
  ]), [width, height])

  useEffect(() => {
    const anchorEl = d3.select(anchorsRef.current)
    const anchors = anchorEl.selectAll('.connect-anchors-pointer').data(list)
    let startX, startY, endX, endY, currentNode

    function dragLine(startX, startY, endX, endY) {
      const pathStr = `M ${startX} ${startY} L ${endX} ${endY}`
      svgInfo.newLine.attr('d', pathStr)
    }

    function removeLine() {
      svgInfo.newLine.attr('d', 'M 0 0')
    }

    anchors.call(
      d3.drag()
        .on('start', function (d) {
          currentNode = getAbsNodeFromTree(nodes, id)
          startX = d3.event.x + currentNode.x
          startY = d3.event.y + currentNode.y
        })
        .on('drag', function (d) {
          endX = d3.event.x + currentNode.x
          endY = d3.event.y + currentNode.y
          dragLine(startX, startY, endX, endY)
        })
        .on('end', function (d) {
          if (targetInfo !== null) {
            const newEdge = {
              id: uuid(),
              source: id,
              sourceDirection: d.direct,
              target: targetInfo.id,
              targetDirection: targetInfo.direct
            }
            const newEdges = [...edges, newEdge]
            dispatch.graph.updateWithBackup({ edges: newEdges })
          }
          removeLine()
        })
    )

    anchors.on('mouseover', function (d) {
      targetInfo = { ...d, id }
    }).on('mouseout', function (d) {
      targetInfo = null
    })
  }, [dispatch.graph, edges, id, list, nodes, svgInfo.newLine])

  return (
    <g className='connect-anchors' ref={anchorsRef}>
      {
        list.map(({ x, y }, index) => (
          <g
            key={index}
            className='connect-anchors-pointer'
            transform={`translate(${x}, ${y})`}
            data-drag='false'
          >
            <circle className='outside' r='16' />
            <circle className='surround' r='8' />
            <circle className='core' r='4' />
          </g>
        ))
      }
    </g>
  )
}
