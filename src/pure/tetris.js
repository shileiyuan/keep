const ROW_NUM = 22
const COL_NUM = 10

export const BGCOLOR = '#cccccc'
// export const BGCOLOR = '#BFCCE0'

export const BLOCK_UNIT = 30

export const BOARD_WIDTH = 30 * COL_NUM

export const BOARD_HEIGHT = 30 * ROW_NUM

export const GRAPH_NAMES = ['straight', 'square', 'cross', 'leftGun', 'rightGun', 'leftSnake', 'rightSnake']

export const GRAPHS = {
  straight: {
    graph: [
      [1, 1, 1, 1]
    ],
    color: 'red'
  },
  square: {
    graph: [
      [1, 1],
      [1, 1]
    ],
    color: '#00BCD4'
  },
  cross: {
    graph: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'green'
  },
  leftGun: {
    graph: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'orange'
  },
  rightGun: {
    graph: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'yellow'
  },
  leftSnake: {
    graph: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'purple'
  },
  rightSnake: {
    graph: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'brown'
  }
}

export const STATUS = {
  paused: 'paused', // 游戏暂停
  playing: 'playing', // 游戏进行中
  over: 'over', // 游戏结束
  unload: 'unload' // 游戏未加载
}

function occupied(matrix, i, j) {
  return matrix[i][j] !== BGCOLOR
}

export function getInitialMatrix() {
  // 22行10列
  const initialMatrix = new Array(ROW_NUM)
  for (let i = 0; i < ROW_NUM; i++) {
    initialMatrix[i] = new Array(COL_NUM).fill(BGCOLOR)
  }
  return initialMatrix
}

export function getActualCoordinates({ graph, offsetX, offsetY }) {
  const coordinates = []
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === 1) {
        coordinates.push({ x: j + offsetX, y: i + offsetY })
      }
    }
  }
  return coordinates
}

export function getMatrixCopy(matrix, coords, color) {
  const matrixCopy = matrix.map((row) => [...row])
  for (let i = 0; i < coords.length; i++) {
    const { x, y } = coords[i]
    matrixCopy[y][x] = color
  }
  return matrixCopy
}

// 方块落到底的时候，生成一个新的matrix
export function getNewMatrix(matrix, currentGraph, lines) {
  const coords = getActualCoordinates(currentGraph)
  const matrixCopy = getMatrixCopy(matrix, coords, currentGraph.color)
  // lines是从小到大排列的要删除的行
  lines = Array.isArray(lines) ? lines : getCompletedLines(matrix, currentGraph)
  lines.forEach(line => {
    for (let j = 0; j < COL_NUM; j++) {
      matrixCopy[line][j] = BGCOLOR
    }
  })
  const step = lines.length
  // 取要删除的行里行号最小的那一行的的行号，至第一行，全部向下移动step行
  for (let row = lines[0] - 1; row >= 0; row--) {
    matrixCopy[row + step] = matrix[row]
  }
  return matrixCopy
}

export function getCompletedLines(matrix, currentGraph) {
  const linesToClear = []
  const coords = getActualCoordinates(currentGraph)
  // 获取一个matrix的拷贝，这个matrix的graph的颜色用temp填充
  const matrixCopy = getMatrixCopy(matrix, coords, 'temp')
  // 将当前graph的纵坐标去重
  const rowSet = new Set()
  coords.forEach(coord => {
    rowSet.add(coord.y)
  })
  const rows = [...rowSet]
  // 遍历matrix，如果其中有一个小的像素是BGCOLOR，那么这个像素所在的行就不应该被消除，否则就要消除这一行
  for (let i = 0; i < rows.length; i++) {
    let flag = true
    for (let j = 0; j < COL_NUM; j++) {
      if (matrixCopy[rows[i]][j] === BGCOLOR) {
        flag = false
      }
    }
    if (flag) {
      linesToClear.push(rows[i])
    }
  }
  // 返回的是要删除的行的行号
  return linesToClear
}

export function checkCollisions(direction, matrix, currentGraph) {
  const currentX = currentGraph.offsetX
  const currentY = currentGraph.offsetY
  let collision = false
  let gameOver = false
  let nx = 0
  let ny = 0
  switch (direction) {
    case 'left':
      nx = -1
      break
    case 'right':
      nx = 1
      break
    case 'down':
      ny = 1
      break
  }
  for (let i = 0; i < currentGraph.graph.length; i++) {
    for (let j = 0; j < currentGraph.graph[i].length; j++) {
      const coord = currentGraph.graph[i][j]
      if (coord) {
        const totalX = nx + currentX + j
        const totalY = ny + currentY + i
        if (totalX < 0 || totalX > COL_NUM - 1 || totalY > ROW_NUM - 1 || occupied(matrix, totalY, totalX)) {
          collision = true
        }
        if (collision && currentY === 0 && direction === 'down') {
          gameOver = true
        }
      }
    }
  }
  return gameOver ? 'GAME_OVER' : collision
}

export function rotate(graph) {
  const rotatedGraph = []
  const row = graph.length
  const col = graph[0].length
  for (let j = 0; j < col; j++) {
    const tempArr = []
    for (let i = 0; i < row; i++) {
      tempArr[row - 1 - i] = graph[i][j]
    }
    rotatedGraph[j] = tempArr
  }
  return rotatedGraph
}

export function getRandomGraph(props = {}) {
  const number = Math.floor(Math.random() * 7)
  const name = GRAPH_NAMES[number]
  return {
    ...GRAPHS[name],
    name,
    ...props
  }
}
