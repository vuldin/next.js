import { configure, action, observable, intercept } from 'mobx'

configure({ enforceActions: true })

let store = null

export default class Store {
  @observable lastUpdate
  @observable light
  @observable origin
  @observable prevOrigin
  @observable storeDefinition
  @action setLastUpdate = val => (this.lastUpdate = val)
  @action setLight = val => (this.light = val)
  @action setOrigin = val => (this.origin = val)
  @action setPrevOrigin = val => (this.prevOrigin = val)
  @action setStoreDefinition = val => (this.storeDefinition = val)
  /*
  @action
  setStoreDefinition = (isServer, hasQuery) => {
    this.storeDefinition = `loaded from ${isServer ? 'server' : 'client'} ${
      hasQuery ? 'with' : 'without'
    } query`
  }
  */

  constructor(state) {
    // initialize property values
    this.setLastUpdate(state.lastUpdate || Date.now())
    this.setLight(state.light || false)
    this.setOrigin(state.origin || '<server request>')
    this.setPrevOrigin(state.prevOrigin)
    this.setStoreDefinition(state.storeDefinition)
    this.created = state.created
    this.pageCreated = state.pageCreated

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
    }, 100)
  }

  stop = () => clearInterval(this.timer)

  getRandomColor = () => {
    // https://stackoverflow.com/a/1484514/2316606
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}

export function initStore(state = {}, { isServer, hasQuery } = {}) {
  const nullStore = store ? false : true
  const emptyState = Object.keys(state).length == 0
  //if (isServer) {
  if (false) {
    store = new Store({})
    store.created = Date.now()
    console.log('server store created')
  } else {
    if (nullStore) {
      store = new Store(state)
      if (emptyState) {
        store.created = Date.now()
        console.log('store created')
      }
    }
  }
  return store
}
