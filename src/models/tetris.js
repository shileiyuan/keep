import {
  getInitialMatrix,
  getRandomGraph,
  getNewMatrix,
  STATUS
} from '@/pure/tetris'

export default {
  state: {
    status: STATUS.unload,
    matrix: getInitialMatrix(),
    score: 0,
    lines: 0,
    currentGraph: {
      name: '',
      graph: [],
      color: '',
      offsetX: 3,
      offsetY: 0
    },
    nextGraph: {
      name: '',
      graph: [],
      color: '',
      offsetX: 1.5,
      offsetY: 0
    }
  },

  reducers: {
    initialData(state) {
      return {
        ...state,
        matrix: getInitialMatrix(),
        currentGraph: getRandomGraph({ offsetX: 3, offsetY: 0 }),
        nextGraph: getRandomGraph({ offsetX: 1.5, offsetY: 0 }),
        score: 0,
        lines: 0
      }
    },

    addScore(state, len) {
      const { lines, score } = state
      return {
        ...state,
        lines: lines + len,
        score: score + Math.pow(len, 2) * 100
      }
    },

    updateCurrentGraph(state, currentGraph) {
      return {
        ...state,
        currentGraph
      }
    },

    setStatus(state, status) {
      return { ...state, status }
    },

    clearLineAnimate(state, matrix) {
      return { ...state, matrix }
    },

    settleGraph(state, lines) {
      const { matrix, currentGraph, nextGraph } = state
      return {
        ...state,
        matrix: getNewMatrix(matrix, currentGraph, lines),
        currentGraph: {
          ...nextGraph,
          offsetX: 3,
          offsetY: 0
        },
        nextGraph: getRandomGraph({ offsetX: 1.5, offsetY: 0 })
      }
    }
  }
}
