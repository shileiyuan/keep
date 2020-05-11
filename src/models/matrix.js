import API from '@/libs/api'

export default {
  state: {
    matrixList: [],
    matrix: {}
  },

  reducers: {
    save(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async queryMatrixList() {
      const res = await API.get.queryMatrixList()
      if (res.success) {
        this.save({ matrixList: res.data.list })
      }
    }
  }
}
