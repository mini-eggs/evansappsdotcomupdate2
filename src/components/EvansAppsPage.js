import React from 'react'
import ErrorComp from './Error'
import LoadingComp from './Loading'
import { connect } from 'react-redux'

const renderPage = page => {
  const style = {
    image: {
      backgroundImage: `url(${page.image})`
    }
  }
  return (
    <div className="content no__padding page__container">
      <div className="col-xs-12 col-sm-8 no__padding min__height vert__align__container">
        <div 
          dangerouslySetInnerHTML={{ __html: page.description }} 
          className="padding vert__align"
        />
      </div>
      <div className="col-xs-12 col-sm-4 no__padding min__height image__container" >
        <div
          className="background__image image"
          style={style.image}
        />
      </div>
      <div className="clear" />
    </div>
  )
}

const findPage = ( pages, page ) => {
  let currentPage = false
  pages.forEach( aPage => {
    if( aPage.slug.toLowerCase().trim() === page.toLowerCase().trim() ) {
      currentPage = aPage
    }
  })
  return currentPage ? renderPage( currentPage ) : <ErrorComp/>
}

const EvansAppsPage = props => {
  const { pages, routeParams } = props
  return (
    <div>
      {
        pages ? findPage( pages, routeParams.page ) : <LoadingComp/>
      }
    </div>
  )
}

const getProps = state => {
  return { pages: state.entries ? state.entries.page : state.entries }
}

export default connect(getProps)(EvansAppsPage)
