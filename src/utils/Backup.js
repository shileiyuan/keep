export default class Backup {
  constructor(initialList = [], count = 3000) {
    this.count = count + 1
    this.list = initialList
    this.pointer = Math.max(initialList.length - 1, 0)
  }

  push(...item) {
    this.list = [
      ...this.list.slice(0, this.pointer + 1),
      ...item
    ].slice(-this.count)
    this.pointer = this.list.length - 1
    return this.getCurrentItem()
  }

  undo() {
    this.pointer = Math.max(this.pointer - 1, 0)
    return this.getCurrentItem()
  }

  redo() {
    this.pointer = Math.min(this.pointer + 1, this.list.length - 1)
    return this.getCurrentItem()
  }

  getCurrentItem() {
    return this.list[this.pointer]
  }

  checkStatus() {
    return {
      undoCount: this.pointer,
      redoCount: Math.max(this.list.length - 1 - this.pointer, 0)
    }
  }
}
