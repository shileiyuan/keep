import R from 'ramda'
import { isNotEmptyArray } from '@/utils/common'

// 找出容器中某一节点的祖先链
export function findChainOfNode(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.id === id) {
      return [node]
    } else {
      if (isNotEmptyArray(node.children)) {
        const result = findChainOfNode(node.children, id)
        if (isNotEmptyArray(result)) {
          return [node, ...result]
        }
      }
    }
  }
}

// 扁平化 nodes
export function flatNodes(nodes) {
  let flattedNodes = []
  nodes.forEach(node => {
    flattedNodes.push(R.dissoc('children', node))
    if (isNotEmptyArray(node.children)) {
      flattedNodes = flattedNodes.concat(flatNodes(node.children))
    }
  })
  return flattedNodes
}

// 计算出节点在容器中的绝对坐标
export function getAbsNodeFromTree(nodes, id) {
  const chain = findChainOfNode(nodes, id)
  const node = chain[chain.length - 1]
  if (node) {
    const { x, y } = chain.reduce(
      (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),
      { x: 0, y: 0 }
    )
    return { ...node, x, y }
  }
  return node
}

export function findNode(nodes, id) {
  return nodes.find(node => {
    if (node.id === id) {
      return node
    } else if (isNotEmptyArray(node.children)) {
      return findNode(node.children, id)
    } else {
      return undefined
    }
  })
}

// 获取节点的路径
export function findNodePath(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.id === id) {
      return [i]
    } else {
      if (isNotEmptyArray(node.children)) {
        const result = findNodePath(node.children, id)
        if (isNotEmptyArray(result)) {
          return [i, 'children', ...result]
        }
      }
    }
  }
}

// 拖动节点的时候，可以计算一次拖动节点的路径，然后拖动过程中根据路径获取要更新的节点
// 比每次都遍历节点树来更新快
export function updateNodeByPath(nodes, path, updater) {
  const node = R.path(path, nodes)
  return R.assocPath(path, updater(node), nodes)
}

// 传入一个updater函数来更新nodes
export function updateNode(nodes, id, updater) {
  return nodes.map(node => {
    if (node.id === id) {
      return updater(node)
    } else if (isNotEmptyArray(node.children)) {
      return {
        ...node,
        children: updateNode(node.children, id, updater)
      }
    } else {
      return node
    }
  })
}

// node1 是否包含 node2
export function checkInclude(node1, node2) {
  function getNodeCoord(node) {
    return {
      x1: node.x,
      y1: node.y,
      x2: node.x + node.width,
      y2: node.y + node.height
    }
  }
  const coord1 = getNodeCoord(node1)
  const coord2 = getNodeCoord(node2)
  return [
    coord1.x1 < coord2.x1,
    coord1.y1 < coord2.y1,
    coord1.x2 > coord2.x2,
    coord1.y2 > coord2.y2
  ].every(Boolean)
}

export const removeChild = R.curry(
  (id, node) => (
    isNotEmptyArray(node.children)
      ? { ...node, children: node.children.filter(child => child.id !== id) }
      : node
  )
)

export const addChild = R.curry((child, node) => ({
  ...node,
  children: Array.isArray(node.children) ? node.children.concat(child) : [child]
}))

export function printNodes(nodes) {
  console.log(flatNodes(nodes))
}

const DEFAULT_STYLES = {
  fill: 'transparent',
  stroke: 'black',
  strokeDasharray: '0',
  strokeWidth: '1'
}

const DAFAULT_POS = {
  width: 100,
  height: 100,
  x: 0,
  y: 0
}

export function formatNodes(nodes) {
  return nodes.map(node => {
    return {
      ...DAFAULT_POS,
      ...node,
      style: R.pick(Object.keys(DEFAULT_STYLES), Object.assign({}, DEFAULT_STYLES, node.style)),
      children: isNotEmptyArray(node.children) ? formatNodes(node.children) : []
    }
  })
}

export function getEdgeCoord(node, direction) {
  const { x, y, width, height } = node
  const map = {
    TOP: { x: x + width / 2, y },
    RIGHT: { x, y: y + height / 2 },
    BOTTOM: { x: x + width / 2, y: y + height },
    LEFT: { x, y: y + height / 2 }
  }
  return map[direction]
}

export function getEdgePath(nodes, edge) {
  const { source, target, sourceDirection, targetDirection } = edge
  const sourceNode = getAbsNodeFromTree(nodes, source)
  const targetNode = getAbsNodeFromTree(nodes, target)
  const sourceCoord = getEdgeCoord(sourceNode, sourceDirection)
  const targetCoord = getEdgeCoord(targetNode, targetDirection)
  return `M ${sourceCoord.x} ${sourceCoord.y} L ${targetCoord.x} ${targetCoord.y}`
}
