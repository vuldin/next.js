import { action, observable, intercept } from 'mobx'

let store = null

export default class Store {
  @observable lastUpdate
  @observable light
  @observable origin

  constructor (state) {
    // initialize property values
    this.lastUpdate = state.lastUpdate || Date.now()
    this.light = state.light || false
    this.origin = state.origin || 'none'
    this.prevOrigin = state.prevOrigin

    store = this

    // changes origin if new value != previous value
    intercept(this, 'origin', change => {
      let result = null
      if (this.origin !== change.newValue) {
        console.log(`origin: ${this.origin} => ${change.newValue}`)
        this.prevOrigin = this.origin
        result = change
      }
      return result
    })
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    })
  }

  stop = () => clearInterval(this.timer)
}

export function initStore (state = {}) {
  if (store === null) store = new Store(state)
  return store
}
