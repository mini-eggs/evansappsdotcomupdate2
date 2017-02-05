import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { BaseURL } from '../routes'
import LoadingComp from './Loading'

const renderPost = props => {
  const { post } = props
  return (
    <div>
      <Link
        to={`${BaseURL}/blog/${post.slug}`}
      >
        <h1>
          {
            post.name
          }
        </h1>
        <br/>
      </Link>
    </div>
  )
}

const renderBlogPosts = posts => {
  return (
    <div className="content padding blog__container">
      {
        posts.map( (post, index) => {
          const RenderPost = renderPost
          return (
            <RenderPost 
              key={index}
              post={post}
            />
          )
        })
      }
    </div>
  )
}

const EvansAppsBlog = props => {
  const { blogPost } = props
  return (
    <div>
      {
        blogPost ? renderBlogPosts( blogPost ) : <LoadingComp/>
      }
    </div>
  )
}

const getProps = state => {
  return { blogPost: state.entries ? state.entries.blogPost : state.entries }
}

export default connect(getProps)(EvansAppsBlog)