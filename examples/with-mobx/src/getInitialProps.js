import { initStore } from '../store'

export default props => {
  const hasQuery = Object.keys(props.query).length != 0
  let initialState = {}
  if (hasQuery) {
    const created = parseInt(props.query.created)
    initialState = { created }
  }
  const isServer = !!props.req
  const state = initStore(initialState, { isServer, hasQuery })
  // TODO calculating storeDefinition in store by sending
  // isServer and hasQuery client/server mismatch error
  //state.setStoreDefinition(isServer, hasQuery)
  const serverStr = `server: ${isServer ? 'yes' : 'no'}`
  const queryStr = `query: ${hasQuery ? 'yes' : 'no'}`
  const definition = `${serverStr} | ${queryStr}`
  state.setStoreDefinition(definition)
  state.setOrigin(props.pathname)
  return { isServer, state }
}

// why is created and lastUpdate always the same on refresh?
// each page instantiates a different store
