import API from '@/libs/api'
import R from 'ramda'

export default {
  state: {
    imgs: [],
    // asc desc
    sortType: 'desc',
    // dirName createTime , size
    sortKey: 'dirName'
  },
  reducers: {
    save(state, payload) {
      return { ...state, ...payload }
    }
  },

  effects: {
    async fetchGallery() {
      await API.get.fetchGallery()
    },

    async queryImages(payload, rootState) {
      const params = R.pick(['sortType', 'sortKey'], payload)
      const res = await API.get.queryImages(params)
      if (res.success) {
        this.save({ imgs: res.data })
      }
    },

    async cleanGallery() {
      await API.post.cleanGallery()
    }
  }
}
