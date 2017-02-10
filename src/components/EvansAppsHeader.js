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
  activeRange = 100

  constructor ( props ) {
    super ( props )
    this.state = {
      listener: undefined,
      rootClass: this.defaultRootClass,
      disposers: []
    }
  }

  componentWillReceiveProps ( props ) {
    // this will be hit when route changes
    document.getElementById( 'root' ).style.marginTop = 0
    document.getElementById( 'root' ).style.transitionDuration = '0ms'
    window.scrollTo( 0 , 0 )
    this.setState({ rootClass: this.defaultRootClass })
  }

  componentDidMount () {

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

  componentWillUnmount () {
    this.state.disposers.forEach( observer => { observer.unsubscribe() })
  }

  scrollHandleHide = () => {
    const headerHeight = document.getElementsByClassName( this.defaultRootClass )[0].offsetHeight
    if ( window.pageYOffset <= headerHeight ) {
      this.setState({ rootClass: this.defaultRootClass }, this.removeMargin)
    }
    else if ( !( window.pageYOffset > this.activeRange ) && this.state.rootClass === this.activeRootClass ) {
      this.setState({ rootClass: this.inactiveRootClass })
    }
  }

  scrollHandle = () => {
    if( window.pageYOffset > this.activeRange && ( this.state.rootClass === this.defaultRootClass || this.state.rootClass === this.inactiveRootClass ) ) {
      this.setState({ rootClass: this.activeRootClass }, this.addMargin )
    }
    else {
      this.scrollHandleHide()
    }
  }

  addMargin () {
    const headerHeight = document.getElementsByClassName( this.activeRootClass )[0].offsetHeight
    document.getElementById( 'root' ).style.marginTop = '-' + headerHeight + 'px'
    document.getElementById( 'root' ).style.transitionDuration = '0ms'
  }

  removeMargin () {
    document.getElementById( 'root' ).style.marginTop = 0
    document.getElementById( 'root' ).style.transitionDuration = '1000ms'
  }

  render () {
    return (
      <div className={this.state.rootClass}>
        {
          this.props.tabs.map(renderTab)
        }
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
