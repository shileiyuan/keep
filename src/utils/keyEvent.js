import R from 'ramda'
import { isNotEmptyArray } from './common'

const MODIFIER_KEYS = ['ctrlKey', 'altKey', 'metaKey', 'shiftKey']

class KeyEvent {
  constructor() {
    this.events = {}
  }

  addEvent(codes, callback, type = 'keydown') {
    const types = Object.keys(this.events)
    const item = { codes, callback }
    if (types.includes(type)) {
      const index = this.events[type].findIndex(group => R.equals(group.codes, codes))
      if (index > -1) {
        this.events[type][index] = item
      } else {
        this.events[type].push(item)
      }
    } else {
      this.events[type] = [item]
      document.addEventListener(type, e => {
        this.events[type].forEach((item, index) => {
          const { codes, callback } = item
          if (typeof callback === 'function') {
            const shouldFire = isNotEmptyArray(codes) ? codes.some(group => {
              return [].concat(group).every(code => {
                return MODIFIER_KEYS.includes(code) ? e[code] : e.key === code
              })
            }) : true
            if (shouldFire) {
              callback(e)
            }
          }
        })
      })
    }
  }

  removeEvent(codes, callback, type = 'keydown') {
    const list = this.events[type]
    if (list !== undefined) {
      this.events[type] = list.filter(item => callback === item.callback && R.equals(codes, item.codes))
    }
  }
}

export default new KeyEvent()
