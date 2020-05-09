import API from '@/libs/api'

export default {
  state: {
    users: []
  },

  reducers: {
    save(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async queryUsers() {
      const res = await API.get.queryUsers()
      if (res.success) {
        this.save({ users: res.data })
      }
    }
  }
}
