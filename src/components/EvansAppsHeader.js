import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

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
  activeRange = 250

  constructor ( props ) {
    super ( props )
    this.state = {
      listener: undefined,
      rootClass: this.defaultRootClass
    }
  }

  componentWillReceiveProps ( props ) {
    window.scrollTo( 0 , 0 )
    this.setState({ rootClass: this.defaultRootClass })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.scrollHandle)
    window.addEventListener('resize', this.scrollHandle)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandle)
    window.removeEventListener('resize', this.scrollHandle)
  }

  scrollHandle = () => {
    const headerHeight = document.getElementsByClassName( this.defaultRootClass )[0].offsetHeight
    if( window.pageYOffset > this.activeRange && ( this.state.rootClass === this.defaultRootClass || this.state.rootClass === this.inactiveRootClass ) ) {
      this.setState({ rootClass: this.activeRootClass })
    }
    else if ( !( window.pageYOffset > this.activeRange ) && this.state.rootClass === this.activeRootClass ) {
      this.setState({ rootClass: this.inactiveRootClass })
    }
    else if ( window.pageYOffset <= headerHeight ) {
      this.setState({ rootClass: this.defaultRootClass })
    }
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
