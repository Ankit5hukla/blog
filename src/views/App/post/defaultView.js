import React, { useContext, useEffect } from 'react'
import ReactHtmlParser from 'html-react-parser'

import { AppContext } from 'src/AppContext'
import { TITLE_UPDATE } from 'src/constants/actions'
import { formatDate } from 'src/helpers/Utils'
import { Link } from 'react-router-dom'

const Post = ({
  post: { _id, title, body, featuredImg, createdAt, postedBy },
}) => {
  const {
      appStore: { user },
      updateAppStore,
    } = useContext(AppContext),
    buffer = Buffer.from(featuredImg.data),
    arraybuffer = Uint8Array.from(buffer).buffer,
    blob = new Blob([arraybuffer], { type: featuredImg.contentType }),
    blobURL = URL.createObjectURL(blob)

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: title,
      },
    })
  }, [title, updateAppStore])

  return (
    <section id={`post-${_id}`} className={'py-5'}>
      <div className={'d-flex justify-content-between'}>
        <h1>{title}</h1>
        {user?.user._id === postedBy._id && (
          <Link
            to={`/admin/edit/${_id}`}
            className={'my-auto text-decoration-none'}
          >
            Edit Blog
          </Link>
        )}
      </div>
      <div className={'d-flex justify-content-between'}>
        <h6>{`Date: ${formatDate(
          new Date(createdAt),
          'MMM dd, yyyy hh:mm aa'
        )}`}</h6>
        <h5>{`Posted By: ${postedBy.name}`}</h5>
      </div>
      <div className={'image'}>
        <img alt={`post-${_id}`} src={blobURL} className={'img-fluid'} />
      </div>
      <div className={'body'}>{ReactHtmlParser(body)}</div>
    </section>
  )
}

export default Post
