import React, { useRef, useMemo, useEffect } from 'react'
import * as d3 from 'd3'
import { useDispatch } from 'react-redux'
import useSelector from '@/hooks/useShallowEqualSelector'
import { getAbsNodeFromTree, updateNode } from '@/pure/graph'

const size = 10
export default function ResizeAnchors(props) {
  const anchorsRef = useRef()
  const dispatch = useDispatch()
  const { svgInfo, nodes } = useSelector('graph', ['svgInfo', 'nodes'])
  const { width, height, id } = props.data
  const list = useMemo(() => ([
    {
      cursor: 'nwse-resize',
      x: 0,
      y: 0,
      resize(event, absNode) {
        const { x, y, width, height } = absNode
        return {
          x: event.x > width ? x + width : x + event.x,
          y: event.y > height ? y + height : y + event.y,
          width: Math.abs(width - event.x),
          height: Math.abs(height - event.y)
        }
      }
    },
    {
      cursor: 'ns-resize',
      x: width / 2,
      y: 0,
      resize(event, absNode) {
        const { x, y, width, height } = absNode
        return {
          x,
          y: event.y > height ? y + height : y + event.y,
          width,
          height: Math.abs(height - event.y)
        }
      }
    },
    {
      cursor: 'nesw-resize',
      x: width,
      y: 0,
      resize(event, absNode) {
        const { x, y, height } = absNode
        return {
          x: event.x > 0 ? x : x + event.x,
          y: event.y < height ? y + event.y : y + height,
          width: Math.abs(event.x),
          height: Math.abs(height - event.y)
        }
      }
    },
    {
      cursor: 'ew-resize',
      x: width,
      y: height / 2,
      resize(event, absNode) {
        const { x, y, height } = absNode
        return {
          x: event.x > 0 ? x : x + event.x,
          y,
          width: Math.abs(event.x),
          height
        }
      }
    },
    {
      cursor: 'nwse-resize',
      x: width,
      y: height,
      resize(event, absNode) {
        const { x, y } = absNode
        return {
          x: event.x > 0 ? x : x + event.x,
          y: event.y > 0 ? y : y + event.y,
          width: Math.abs(event.x),
          height: Math.abs(event.y)
        }
      }
    },
    {
      cursor: 'ns-resize',
      x: width / 2,
      y: height,
      resize(event, absNode) {
        const { x, y, width } = absNode
        return {
          x,
          y: event.y > 0 ? y : y + event.y,
          width,
          height: Math.abs(event.y)
        }
      }
    },
    {
      cursor: 'nesw-resize',
      x: 0,
      y: height,
      resize(event, absNode) {
        const { x, y } = absNode
        return {
          x: event.x > 0 ? x : x + event.x,
          y: event.y > 0 ? y : y + event.y,
          width: Math.abs(event.x),
          height: Math.abs(event.y)
        }
      }
    },
    {
      cursor: 'ew-resize',
      x: 0,
      y: height / 2,
      resize(event, absNode) {
        const { x, y } = absNode
        return {
          x: width - event.x > 0 ? x + event.x : x + width,
          y,
          width: Math.abs(width - event.x),
          height
        }
      }
    }
  ]), [height, width])

  useEffect(() => {
    const anchorEl = d3.select(anchorsRef.current)
    const anchors = anchorEl.selectAll('rect').data(list)
    let currentNode, isDrag
    const drag = d3.drag()
      .on('start', function () {
        isDrag = false
        currentNode = getAbsNodeFromTree(nodes, id)
      })
      .on('drag', function (d) {
        isDrag = true
        const rect = d.resize(d3.event, currentNode)
        const { x, y, width, height } = rect
        svgInfo.resizeWrap.attr('d', `M ${x} ${y} h ${width} v ${height} H ${x} Z`)
      })
      .on('end', function (d) {
        if (!isDrag) return
        svgInfo.resizeWrap.attr('d', 'M 0 0')
        const rect = d.resize(d3.event, currentNode)
        const newNodes = updateNode(nodes, id, node => {
          return {
            ...node,
            x: node.x + rect.x - currentNode.x,
            y: node.y + rect.y - currentNode.y,
            width: rect.width,
            height: rect.height
          }
        })
        dispatch.graph.updateWithBackup({ nodes: newNodes })
      })
    anchors.call(drag)
    return () => {

    }
  }, [dispatch.graph, id, list, nodes, svgInfo.resizeWrap])
  return (
    <g ref={anchorsRef} className='resize-anchors'>
      {
        list.map((item, index) => {
          const { x, y, cursor } = item
          return (
            <rect
              key={index}
              x={x - size / 2}
              y={y - size / 2}
              width={size}
              height={size}
              style={{ cursor }}
            />
          )
        })
      }
    </g>
  )
}
