import { configure, action, observable, intercept } from 'mobx'

configure({ enforceActions: true })

let store = null

export default class Store {
  @observable lastUpdate
  @observable light
  @observable origin
  @action setLastUpdate = val => (this.lastUpdate = val)
  @action setLight = val => (this.light = val)
  @action setOrigin = val => (this.origin = val)

  constructor(state) {
    // initialize property values
    this.setLastUpdate(state.lastUpdate || Date.now())
    this.setLight(state.light || false)
    this.setOrigin(state.origin || 'server')
    this.prevOrigin = state.prevOrigin

    store = this

    // changes origin if new value != previous value
    intercept(this, 'origin', change => {
      let result = null
      if (this.origin !== change.newValue) {
        this.prevOrigin = this.origin
        result = change
      }
      return result
    })
  }

  start = () => {
    this.timer = setInterval(() => {
      this.setLastUpdate(Date.now())
      this.setLight(true)
    })
  }

  stop = () => clearInterval(this.timer)
}

export function initStore(state = {}) {
  if (store === null) store = new Store(state)
  return store
}
