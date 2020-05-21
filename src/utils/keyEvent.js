import R from 'ramda'
import { isNotEmptyArray } from './common'

const MODIFIER_KEYS = ['ctrlKey', 'altKey', 'metaKey', 'shiftKey']

// this.events = {
//   keydown: {
//     cb: func,
//     list: []
//   }
// }
class KeyEvent {
  constructor() {
    this.events = {}
  }

  addEvent(codes, callback, type = 'keydown') {
    const types = Object.keys(this.events)
    const item = { codes, callback }
    if (types.includes(type)) {
      const index = this.events[type].list.findIndex(group => R.equals(group.codes, codes))
      if (index > -1) {
        this.events[type].list[index] = item
      } else {
        this.events[type].list.push(item)
      }
    } else {
      const cb = e => {
        this.events[type].list.forEach((item, index) => {
          const { codes, callback } = item
          if (typeof callback === 'function') {
            const shouldFire = isNotEmptyArray(codes) ? codes.some(group => {
              return [].concat(group).every(code => {
                return MODIFIER_KEYS.includes(code) ? e[code] : e.key === code
              })
            }) : true
            if (shouldFire) {
              e.preventDefault()
              callback(e)
            }
          }
        })
      }
      this.events[type] = { list: [item], cb }
      document.addEventListener(type, cb)
    }
  }

  removeEvent(codes, callback, type = 'keydown') {
    const event = this.events[type]
    if (typeof event !== 'undefined') {
      const list = event.list.filter(item => callback === item.callback && R.equals(codes, item.codes))
      if (list.length === 0) {
        document.removeEventListener(type, this.events[type].cb)
        delete this.events[type]
      } else {
        this.events[type].list = list
      }
    }
  }
}

export default new KeyEvent()
