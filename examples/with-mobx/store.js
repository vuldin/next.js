import { configure, action, observable, intercept } from 'mobx'

configure({ enforceActions: true })

let store = null

export default class Store {
  @observable lastUpdate
  @observable light
  @observable origin
  @observable prevOrigin
  @action setLastUpdate = val => (this.lastUpdate = val)
  @action setLight = val => (this.light = val)
  @action setOrigin = val => (this.origin = val)
  @action setPrevOrigin = val => (this.prevOrigin = val)

  constructor(state) {
    // initialize property values
    this.setLastUpdate(state.lastUpdate || Date.now())
    this.setLight(state.light || false)
    this.setOrigin(state.origin || 'server')
    this.setPrevOrigin(state.prevOrigin)

    store = this

    // change prevOrigin to be previous origin value
    intercept(this, 'origin', change => {
      let result = null
      if (this.origin !== change.newValue) {
        this.setPrevOrigin(this.origin)
        result = change
      }
      return result
    })
  }

  start = () => {
    this.timer = setInterval(() => {
      this.setLastUpdate(Date.now())
      this.setLight(true)
    }, 1000)
  }

  stop = () => clearInterval(this.timer)
}

export function initStore(state = {}) {
  if (store === null) store = new Store(state)
  return store
}
