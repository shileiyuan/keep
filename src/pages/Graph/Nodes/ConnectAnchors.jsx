import React, { useMemo, useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import useSelector from '@/hooks/useShallowEqualSelector'

const CONNECT_DIRECTION = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT'
}

export default function ConnectAnchors(props) {
  const { svgInfo } = useSelector('graph', ['svgInfo'])
  const { width, height, x, y, id } = props.data

  const anchorsRef = useRef()

  const list = useMemo(() => ([
    { x: width / 2, y: 0, direct: CONNECT_DIRECTION.TOP },
    { x: width, y: height / 2, direct: CONNECT_DIRECTION.RIGHT },
    { x: width / 2, y: height, direct: CONNECT_DIRECTION.BOTTOM },
    { x: 0, y: height / 2, direct: CONNECT_DIRECTION.LEFT }
  ]), [width, height])

  const dragLine = useCallback((startX, startY, endX, endY) => {
    const pathStr = `M ${startX} ${startY} L ${endX} ${endY}`
    svgInfo.newLine.attr('d', pathStr)
  }, [svgInfo.newLine])

  useEffect(() => {
    const connectAnchor = d3.select(anchorsRef.current)
    // console.log(anchorsRef.current.parentElement)
    // console.log(anchorsRef.current.parentNode)
    const anchors = connectAnchor.selectAll('.connect-anchors-pointer').data(list)
    let startX, startY, endX, endY, startId

    anchors.call(
      d3.drag()
        .on('start', function (d) {
          startX = d3.event.x + x
          startY = d3.event.y + y
          startId = id
          // console.log(d, id)
        })
        .on('drag', function (d) {
          endX = d3.event.x + x
          endY = d3.event.y + y
          dragLine(startX, startY, endX, endY)
        })
        .on('end', function (d) {
          if (id !== startId) {
            console.log('canEnd')
          }
        })
    )

    anchors.on('mouseover', function (d) {
      // console.log(d, id, 'mouseover')
    })
  }, [dragLine, id, list, svgInfo.newLine, x, y])

  return (
    <g className='connect-anchors' ref={anchorsRef}>
      {
        list.map(({ x, y }, index) => (
          <g
            key={index}
            className='connect-anchors-pointer'
            transform={`translate(${x}, ${y})`}
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
