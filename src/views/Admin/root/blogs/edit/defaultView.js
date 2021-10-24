import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import {
  TITLE_UPDATE,
  TOKEN_EXPIRED,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const EditBlog = ({
  history,
  match: {
    params: { postId },
  },
}) => {
  const pageTitle = 'Edit Post',
    {
      appStore: { apiURL, user },
      updateAppStore,
    } = useContext(AppContext),
    fetchPost = ({ queryKey: postId }) =>
      axios({
        method: 'get',
        url: `${apiURL}/post/id/${postId}`,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }).catch(error => {
        if (error.response) {
          error.response.status === 504 &&
            updateAppStore({
              type: TOKEN_EXPIRED,
              payload: {
                history,
                error: {
                  code: TOKEN_EXPIRED,
                  color: 'warning',
                  message: error.response.data.error,
                },
              },
            })
        }
      }),
    { isLoading, data, isError, error } = useQuery(postId, fetchPost, {
      staleTime: 0,
      refetchInterval: false,
      retry: false,
      select: data => data?.data,
    }),
    [title, setTitle] = useState(''),
    [btnDisable, setBtnDisable] = useState(false),
    handleSubmit = event => {
      event.preventDefault()
      setBtnDisable(true)
      try {
        setTimeout(() => {
          console.log(title)
        }, 5000)
      } catch (err) {
        updateAppStore({
          type: UNEXPECTED_ERROR,
          payload: {
            error: {
              code: UNEXPECTED_ERROR,
              color: 'warning',
              message: err.message,
            },
          },
        })
      } finally {
        setBtnDisable(false)
      }
    }

  useEffect(() => {
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: pageTitle,
      },
    })
  }, [updateAppStore])

  !false && console.log(isLoading, data, isError, title)

  if (isLoading) {
    return <div>Loading...</div>
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
    <form className={`card mt-4 p-3`} onSubmit={event => handleSubmit(event)}>
      <div className={'form-group mb-3'}>
        <label htmlFor={'title'} className={'form-label'}>
          Title
        </label>
        <input
          className={'form-control'}
          id={'title'}
          type={'text'}
          onChange={({ target: { value } }) => setTitle(value)}
          placeholder={'Post Title'}
          value={data?.title}
          required={true}
        />
      </div>
      <div className={'form-group mb-3'}>
        <label htmlFor={'title'} className={'form-label'}>
          Content
        </label>
        <input
          className={'form-control'}
          id={'title'}
          type={'text'}
          onChange={({ target: { value } }) => setTitle(value)}
          placeholder={'Post Title'}
          value={data?.title}
          required={true}
        />
      </div>
      <div className={'form-group'}>
        <Button type={'submit'} variant={'app'} disabled={btnDisable}>
          {btnDisable ? (
            <div
              className={'spinner-border spinner-border-sm text-light'}
              role={'status'}
            >
              <span className={'visually-hidden'}>Loading...</span>
            </div>
          ) : (
            'Update'
          )}
        </Button>
      </div>
    </form>
  )
}

export default EditBlog
