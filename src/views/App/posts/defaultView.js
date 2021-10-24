import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { TITLE_UPDATE } from 'src/constants/actions'
import { formatDate, getExcerpt } from 'src/helpers/Utils'

const Posts = () => {
  const pageTitle = 'All Posts',
    staleTime = 30000,
    fetchPosts = () => axios.get(`${apiURL}/post`),
    {
      appStore: { apiURL },
      updateAppStore,
    } = useContext(AppContext),
    { isLoading, data, isError, error } = useQuery('all-posts', fetchPosts, {
      // cacheTime: 5000,
      // refetchOnMount: false,
      staleTime,
      select: data => data?.data.posts,
    })

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle,
      },
    })
  }, [updateAppStore])

  if (isLoading) {
    return (
      <div
        className={'spinner-border spinner-border-sm text-light'}
        role={'status'}
      >
        <span className={'visually-hidden'}>Loading...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={`toast align-items-center text-white bg-danger border-0 show py-3 px-4`}
        role={'alert'}
        aria-live={'assertive'}
        aria-atomic={'true'}
      >
        {error.message}
      </div>
    )
  }

  return (
    <section>
      <div className={'row'}>
        {data.map(({ _id, title, slug, postedBy, createdAt, body }) => {
          return (
            <div className={'clo-sm-6 col-md-4'} key={_id}>
              <div className={'card border-0 mb-4'}>
                <div className={'card-body'}>
                  <h2 className={'card-title'}>
                    <Link
                      to={`/${slug}`}
                      className={'text-app text-decoration-none'}
                    >
                      {title}
                    </Link>
                  </h2>
                  <h5>{postedBy.name}</h5>
                  <h6>
                    {formatDate(new Date(createdAt), 'MMM dd, yyyy hh:mm aa')}
                  </h6>
                  <p className={'card-text'}>
                    {getExcerpt(body)}
                    <Link
                      to={`/${slug}`}
                      className={'text-gray text-decoration-none'}
                    >
                      Read More
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Posts
