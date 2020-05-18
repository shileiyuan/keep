import API from '@/libs/api'
import CONFIG from '@/libs/config'

export default {
  state: {
    userName: '',
    userId: '',
    isAuthed: Boolean(localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY))
  },

  reducers: {
    save(state, payload) {
      return { ...state, ...payload }
    },
    saveInfo(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async login(values) {
      const res = await API.post.login(values)
      if (res.success) {
        const { token, name, id } = res.data
        this.save({
          isAuthed: true,
          userId: id,
          userName: name
        })
        localStorage.setItem(CONFIG.AUTH_TOKEN_STORAGE_KEY, token)
      }
    },
    async getUserInfo() {
      const token = localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
      if (!token) return
      const res = await API.get.getUserInfo()
      if (res.success) {
        const { name, id } = res.data
        this.save({
          isAuthed: true,
          userId: id,
          userName: name
        })
      } else {
        this.logout()
      }
    },
    logout() {
      this.save({
        userName: '',
        userId: '',
        isAuthed: false
      })
      localStorage.removeItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
    }
  }
}
