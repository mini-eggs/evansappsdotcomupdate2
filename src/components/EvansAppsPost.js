import React from 'react'
import ErrorComp from './Error'
import LoadingComp from './Loading'
import { connect } from 'react-redux'

const renderPost = post => {
  return (
    <div className="content">
      <div className="padding">
        <h1>
          {
            post.name
          }
        </h1>
        <br/>
        <h3 dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
    </div>
  )
}

const findPost = ( posts, blog ) => {
  let currentPost = false
  posts.forEach( aPost => {
    if( aPost.slug.toLowerCase().trim() === blog.toLowerCase().trim() ) {
      currentPost = aPost
    }
  })
  return currentPost ? renderPost( currentPost ) : <ErrorComp/>
}

const EvansAppsPage = props => {
  const { blogPost, routeParams } = props
  return (
    <div className="post__container">
      {
        blogPost ? findPost( blogPost, routeParams.blog ) : <LoadingComp/>
      }
    </div>
  )
}

const getProps = state => {
  return { blogPost: state.entries ? state.entries.blogPost : state.entries }
}

export default connect(getProps)(EvansAppsPage)
