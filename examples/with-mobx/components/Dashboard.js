import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './Clock'
import Timer from './Timer'

@inject('store')
@observer
class Dashboard extends React.Component {
  componentDidMount() {
    const { created, color } = this.props.store
    const state = {
      data: { created, color },
      title: 'store',
      url: `?created=${created}&color=${color}`,
    }
    history.pushState(state.data, state.title, state.url)
    //window.location.search != `&created=${created}&color=${color}`
    this.props.store.start()
  }

  componentWillUnmount() {
    this.props.store.stop()
  }

  render() {
    const {
      created,
      light,
      storeDefinition,
      prevOrigin,
      lastUpdate,
    } = this.props.store
    const query = { created }

    const isServer = !light

    return (
      <div>
        <section className="top">
          <div>
            <h4>{this.props.title} </h4>
            <div className="definition">{storeDefinition}</div>
          </div>
          <div>
            <h4>legend</h4>
            <div className="legend">
              <div>rendered on: </div>
              <div>
                <div className="time server">server</div>
                <div className="time client">client</div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section>
          <h4>initial state</h4>
          <div>
            Stores are initialized on the server during initial page request.{' '}
            <em>initial state</em> refers to those variables that values which
            are persistent from the first time the store is instantiated.
          </div>
          <div>
            We are on the first initStore request when
            <ol>
              <li>store is null and</li>
              <li>incoming state is empty</li>
            </ol>
          </div>
          <div>
            In this case we instatiate a new store and set the created variable.
          </div>
          <Timer time={created} isServer={isServer} />
        </section>
        <hr />
        <section>
          <h4>page state</h4>
          <div>
            State is given as a prop to initStore when stores are requested when
            navigating to other pages, and in this scenario we instatiate stores
            with the given state.
          </div>
          <div>{prevOrigin} created at:</div>
          <Clock lastUpdate={lastUpdate} light={light} />
        </section>
        <hr />
        <section>
          <h4>navigation and the effects on state</h4>
          <div>
            Why does a store have create date set when being loaded from a link
            without a query?
          </div>
          <nav>
            <span>switch page, sending initial store state via query: </span>
            <Link href={{ pathname: this.props.linkTo, query }}>
              <a>yes</a>
            </Link>
            <span> | </span>
            <Link href={this.props.linkTo}>
              <a>no</a>
            </Link>
          </nav>
          <div className="note">
            * the next page's store could already have initial state
          </div>
        </section>
        <style jsx>{`
          .top {
            display: flex;
            justify-content: space-evenly;
          }
          .definition {
            font-style: italic;
          }
          .note {
            font-style: italic;
            font-size: smaller;
          }
          .legend {
            display: flex;
            align-items: center;
          }
        `}</style>
        <style jsx global>{`
          body {
            font: 18px Menlo, Monaco, 'Courier New', monospace;
          }
          section {
            margin-top: 10px;
          }
          .time {
            display: inline-block;
            font-size: larger;
            padding: 15px;
          }
          .server {
            background-color: wheat;
          }
          .client {
            background-color: whitesmoke;
          }
        `}</style>
      </div>
    )
  }
}

export default Dashboard
