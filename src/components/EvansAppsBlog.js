import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const renderPost = (post, index) => {
  return (
    <div key={index}>
      <Link to={`/blog/${post.slug}`} >
        <h1>
          {post.name}
        </h1>
        <br/>
      </Link>
    </div>
  )
}

const EvansAppsBlog = data => {
  return (
    <div className="content">
      {data.posts.map(renderPost)}
    </div>
  )
}

const getProps = state => {
  return { posts: state.entries ? state.entries.blogPost : [] }
}

export default connect(getProps)(EvansAppsBlog)