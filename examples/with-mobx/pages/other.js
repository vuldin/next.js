import React from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Page from '../components/Page'

export default class Other extends React.Component {
  static getInitialProps ({ req, pathname }) {
    const isServer = !!req
    const state = initStore()
    state.origin = pathname
    return { isServer, state }
  }

  constructor (props) {
    super(props)
    if (props.isServer) this.store = initStore(props.state)
    else this.store = props.state
  }

  render () {
    return (
      <Provider store={this.store}>
        <Page title='Other Page' linkTo='/' />
      </Provider>
    )
  }
}
