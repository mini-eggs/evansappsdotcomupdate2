import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'

const renderTab = (tab, index) => {
  const slug = tab.slug || tab.url
  const attribute = slug.indexOf('http') > -1 || slug.indexOf('mailto') > -1 ? 'href' : 'to'
  const link = {}
  link[ attribute ] = slug
  return <Link key={index} {...link} className="link" activeClassName="link__active">{tab.name}</Link>
}

class EvansAppsHeader extends React.Component {

  defaultRootClass = ' nav__container '
  activeRootClass = ' nav__container nav__active '
  inactiveRootClass = ' nav__container nav__active nav__inactive '
  initialInactiveRootClass = ' nav__container nav__active nav__inactive nav__initial '
  activeRange = 100
  transitionTime = 400

  constructor ( props ) {
    super ( props )
    this.state = {
      rootClass: this.initialInactiveRootClass,
      disposers: []
    }
  }

  componentWillReceiveProps ( props ) {
    this.setState({ rootClass: this.initialInactiveRootClass }, () => {
      this.destroyEvents()
      window.scrollTo( 0 , 0 )
      setTimeout( () => {
        this.createEvents()
      }, this.transitionTime)
    })
  }

  componentDidMount () {
    this.createEvents()
  }

  componentWillUnmount () {
    this.destroyEvents()
  }

  createEvents () {
    const scrollObserver = Observable.fromEvent( window, 'scroll' )
    const scrollObserverDisposer = scrollObserver.subscribe( this.scrollHandleHide )
    const scrollObserverDebounced = scrollObserver.debounce( () => Observable.interval(750) )
    const scrollObserverDebouncedDisposer = scrollObserverDebounced.subscribe( this.scrollHandle )
    this.setState({
      disposers: [
        scrollObserverDisposer,
        scrollObserverDebouncedDisposer
      ]
    })
  }

  destroyEvents () {
    this.state.disposers.forEach( observer => { observer.unsubscribe() })
  }

  scrollHandleHide = () => {
    const headerHeight = document.getElementsByClassName( this.defaultRootClass )[0].offsetHeight
    if ( window.pageYOffset <= headerHeight ) {
      this.setState({ rootClass: this.inactiveRootClass })
    }
    else if ( !( window.pageYOffset > this.activeRange ) && this.state.rootClass === this.activeRootClass ) {
      this.setState({ rootClass: this.inactiveRootClass })
    }
  }

  scrollHandle = () => {
    if( window.pageYOffset > this.activeRange && ( this.state.rootClass === this.defaultRootClass || this.state.rootClass === this.inactiveRootClass ) ) {
      this.setState({ rootClass: this.activeRootClass })
    }
    else {
      this.scrollHandleHide()
    }
  }

  render () {
    const tabs = this.props.tabs.map(renderTab)
    return (
      <div>
        <div className={this.defaultRootClass}>
          {tabs}
        </div>
        <div className={this.state.rootClass}>
          {tabs}
        </div>
      </div>
    )
  }

}

const getProps = state => {
  return {
    tabs: state.entries ? [ ...state.entries.tabs, ...state.entries.about[0].links ] : [],
    routing: state.routing
  }
}

export default connect(getProps)(EvansAppsHeader)
