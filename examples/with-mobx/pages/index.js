import React from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../store'
import Dashboard from '../components/Dashboard'
import getInitialProps from '../src/getInitialProps'

export default class Index extends React.Component {
  static getInitialProps = getInitialProps

  constructor(props) {
    super(props)
    this.store = props.isServer ? initStore(props.state) : props.state
  }

  render() {
    return (
      <Provider store={this.store}>
        <Dashboard title="index page" linkTo="/other" />
      </Provider>
    )
  }
}
