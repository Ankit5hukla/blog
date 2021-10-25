import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { OutlineButton } from 'src/components/Buttons'
import { TITLE_UPDATE } from 'src/constants/actions'
import { formatDate, getExcerpt, getPostImageURL } from 'src/helpers/Utils'

const Posts = () => {
  const pageTitle = 'All Posts',
    limit = 9,
    staleTime = 30000,
    fetchPosts = ({ pageParam: pageNum = 1 }) =>
      axios.get(`${apiURL}/post/${pageNum}/${limit}`),
    {
      appStore: { apiURL },
      updateAppStore,
    } = useContext(AppContext),
    {
      isLoading,
      data,
      isError,
      error,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery('all-posts', fetchPosts, {
      staleTime,
      getNextPageParam: lastPage => {
        if (lastPage?.data?.currentPage < lastPage?.data?.totalPages) {
          return lastPage?.data?.currentPage + 1
        } else {
          return undefined
        }
      },
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
      <div className={'d-flex h-100 align-items-center justify-content-center'}>
        <div
          className={'spinner-border spinner-border-sm text-app'}
          role={'status'}
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className={'visually-hidden'}>Loading...</span>
        </div>
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
    <section className={'py-5'}>
      <div className={'row'}>
        {data.pages.map((group, index) => {
          return (
            <React.Fragment key={index}>
              {group?.data?.posts.map(
                ({ _id, title, slug, postedBy, createdAt, body }) => {
                  return (
                    <div className={'clo-sm-6 col-md-4'} key={_id}>
                      <div className={'card border-0 mb-4'}>
                        <Link
                          to={`/${slug}`}
                          className={'text-app text-decoration-none'}
                        >
                          <img
                            alt={`post-${_id}`}
                            src={getPostImageURL(_id)}
                            className={'card-img-top'}
                          />
                        </Link>
                        <div className={'card-body'}>
                          <h4 className={'card-title'}>
                            <Link
                              to={`/${slug}`}
                              className={'text-app text-decoration-none'}
                            >
                              {title}
                            </Link>
                          </h4>
                          <div
                            className={'d-flex justify-content-between mt-3'}
                          >
                            <h5>{postedBy.name}</h5>
                            <small>
                              {`Posted on ${formatDate(
                                new Date(createdAt),
                                'MMM dd, yyyy hh:mm aa'
                              )}`}
                            </small>
                          </div>
                          <p className={'card-text'}>{getExcerpt(body)}</p>
                          <Link
                            to={`/${slug}`}
                            className={'text-gray text-decoration-none'}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </React.Fragment>
          )
        })}
      </div>
      {hasNextPage && (
        <div className={'d-flex justify-content-center'}>
          <OutlineButton
            variant={'app'}
            className={'btn-lg'}
            disabled={isFetchingNextPage}
            onClick={fetchNextPage}
            style={{ minWidth: '120px' }}
          >
            {isFetchingNextPage ? (
              <div
                className={'spinner-border spinner-border-sm text-app'}
                role={'status'}
              >
                <span className={'visually-hidden'}>Loading...</span>
              </div>
            ) : (
              'Load More'
            )}
          </OutlineButton>
        </div>
      )}
    </section>
  )
}

export default Posts
