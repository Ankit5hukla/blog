import React, { useContext, useEffect } from 'react'
import ReactHtmlParser from 'html-react-parser'

import { AppContext } from 'src/AppContext'
import { TITLE_UPDATE } from 'src/constants/actions'
import { formatDate } from 'src/helpers/Utils'

const Post = ({ post: { _id, title, body, createdAt, postedBy } }) => {
  const { updateAppStore } = useContext(AppContext)

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: title,
      },
    })
  }, [title, updateAppStore])

  return (
    <section id={`post-${_id}`}>
      <h1>{title}</h1>
      <div className={'d-flex justify-content-between'}>
        <h6>{`Date: ${formatDate(
          new Date(createdAt),
          'MMM dd, yyyy hh:mm aa'
        )}`}</h6>
        <h5>{`Posted By: ${postedBy.name}`}</h5>
      </div>
      <div className={'body'}>{ReactHtmlParser(body)}</div>
    </section>
  )
}

export default Post
