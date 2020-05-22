import React, { useRef, useEffect } from 'react'
import R from 'ramda'
import _ from 'lodash'
import * as d3 from 'd3'
import cls from 'classnames'
import { useDispatch } from 'react-redux'
import {
  updateNode,
  findChainOfNode,
  removeChild,
  checkInclude,
  addChild,
  getAbsNodeFromTree,
  findNodePath,
  updateNodeByPath
  // printNodes
} from '@/pure/graph'
import { isNotEmptyArray, setAttrs } from '@/utils/common'
import useSelector from '@/hooks/useShallowEqualSelector'
import Nodes from './index.jsx'
import { shapes } from './shapes'
import ConnectAnchors from './ConnectAnchors'
import ResizeAnchors from './ResizeAnchors'

function findShape(node) {
  return shapes.find(item => item.key === node.shape)
}

export default function Node(props) {
  const dispatch = useDispatch()
  const { nodes, selectedNodes } = useSelector('graph', ['nodes', 'selectedNodes'])
  const { data } = props
  const ref = useRef(null)
  const textRef = useRef(null)

  const shape = findShape(data)

  // 处理节点拖动
  useEffect(() => {
    if (!ref.current) return

    function onDragEnd(currentNode, offsetX, offsetY) {
      // hideDragingNode()
      // if (offsetX === 0 && offsetY === 0) return
      let newNodes = []
      const absCurrentNode = R.evolve({
        x: R.add(offsetX),
        y: R.add(offsetY)
      })(currentNode)

      const chain = findChainOfNode(nodes, currentNode.id)
      const parent = chain[chain.length - 2]

      if (parent) {
        newNodes = updateNode(nodes, parent.id, removeChild(currentNode.id))
      } else {
        newNodes = nodes.filter(node => node.id !== currentNode.id)
      }

      // 寻找目标节点
      function findTargetNode(nodes, searchingNodes, absCurrentNode) {
        for (const node of searchingNodes) {
          const absNode = getAbsNodeFromTree(nodes, node.id)
          const isInclude = checkInclude(absNode, absCurrentNode)
          if (isInclude) {
            if (isNotEmptyArray(node.children)) {
              return findTargetNode(nodes, node.children, absCurrentNode) || node
            } else {
              return node
            }
          }
        }
        return undefined
      }

      const targetNode = findTargetNode(nodes, nodes, absCurrentNode)

      if (targetNode) {
        // 算出当前节点在当前目标节点下的相对位置
        const absTargetNode = getAbsNodeFromTree(nodes, targetNode.id)
        const relativeCurrentNode = {
          ...absCurrentNode,
          x: absCurrentNode.x - absTargetNode.x,
          y: absCurrentNode.y - absTargetNode.y
        }
        newNodes = updateNode(newNodes, targetNode.id, addChild(relativeCurrentNode))
      } else {
        newNodes = newNodes.concat(absCurrentNode)
      }

      dispatch.graph.updateWithBackup({ nodes: newNodes })
    }

    function onDrag(currentNodePath, offsetX, offsetY) {
      const newNodes = updateNodeByPath(nodes, currentNodePath, R.evolve({
        x: R.add(offsetX),
        y: R.add(offsetY)
      }))
      dispatch.graph.update({ nodes: newNodes })
    }
    const delayDrag = _.throttle(onDrag, 100)

    let startX, startY, offsetX, offsetY, currentNode, currentNodePath, isDrag
    const dom = d3.select(ref.current)
    const drag = d3.drag()
      .on('start', function () {
        isDrag = false
        startX = d3.event.x
        startY = d3.event.y
        currentNode = getAbsNodeFromTree(nodes, data.id)
        currentNodePath = findNodePath(nodes, data.id)
      })
      .on('drag', function () {
        isDrag = true
        offsetX = d3.event.x - startX
        offsetY = d3.event.y - startY
        delayDrag(currentNodePath, offsetX, offsetY)
      })
      .on('end', function () {
        if (!isDrag) return
        offsetX = d3.event.x - startX
        offsetY = d3.event.y - startY
        setTimeout(() => {
          // 这个计算很复杂，耗时很久，如果不异步执行，就会阻塞click事件的触发
          // 复现：第一次点击最外层元素的时候，不会触发click事件
          onDragEnd(currentNode, offsetX, offsetY)
        }, 0)
      })

    dom.call(drag)
  }, [data.id, dispatch.graph, nodes])

  // 设置节点文字
  useEffect(() => {
    if (!data.shapeName) return
    const text = d3.select(textRef.current)
    if (isNotEmptyArray(data.children)) {
      text.attr('x', 10).attr('y', 18)
    } else {
      const textBox = text.node().getBBox()
      const attrs = [
        ['x', data.width / 2 - textBox.width / 2],
        ['y', data.height / 2 + textBox.height / 2 - 4]
      ]

      if (data.style.fill !== 'transparent') {
        attrs.push(
          ['stroke', 'red'],
          ['stroke-width', '1px'],
          ['fill', 'none']
        )
      }
      setAttrs(attrs, text)
    }
  }, [data])

  function handleClick(e) {
    e.stopPropagation()
    dispatch.graph.update({ selectedNodes: [data] })
  }
  const isSelected = selectedNodes.some(node => node.id === data.id)
  const nodeClassName = cls({
    'node': true,
    'node-selected': isSelected
  })

  return (
    <g
      ref={ref}
      transform={`translate(${data.x}, ${data.y})`}
      onClick={handleClick}
      className={nodeClassName}
    >
      <g className='node-shape'>
        {shape ? shape.component(data) : null}
        {isSelected ? <ResizeAnchors data={data} /> : <ConnectAnchors data={data} />}
      </g>
      {data.shapeName && <text ref={textRef}>{data.shapeName}</text>}
      {isNotEmptyArray(data.children) && <Nodes data={data.children} />}
    </g>
  )
}
