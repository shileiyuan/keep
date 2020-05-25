import Backup from '@/utils/Backup'

const backup = new Backup()

const getInitialState = () => ({
  nodes: [],
  edges: [],
  svgInfo: {},
  selectedNodes: [],
  selectedEdges: [],
  undoCount: 0,
  redoCount: 0
})

export default {
  state: getInitialState(),

  reducers: {

    init(state, payload) {
      return { ...state, ...payload }
    },

    update(state, payload) {
      return { ...state, ...payload }
    },

    updateWithBackup(state, payload) {
      backup.push({ ...state, ...payload })
      const backupStatus = backup.checkStatus()
      return {
        ...state,
        ...payload,
        ...backupStatus
      }
    },
    undo(state) {
      const item = backup.undo()
      const backupStatus = backup.checkStatus()
      return {
        ...state,
        ...item,
        ...backupStatus
      }
    },
    redo(state) {
      const item = backup.redo()
      const backupStatus = backup.checkStatus()
      return {
        ...state,
        ...item,
        ...backupStatus
      }
    },
    reset(state) {
      backup.reset()
      return getInitialState()
    }

  }
}
