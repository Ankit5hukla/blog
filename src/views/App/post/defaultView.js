import React from 'react'

const Post = ({
  match: {
    params: { slug },
  },
}) => {
  const pageTitle = 'Post'
  !false && console.log(slug)

  return (
    <section>
      <h1>{pageTitle}</h1>
    </section>
  )
}

export default Post
