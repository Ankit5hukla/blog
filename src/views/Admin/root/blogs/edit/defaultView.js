import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { editorConfig } from 'src/constants/defaultValues'
import { getPostImageURL } from 'src/helpers/Utils'
import {
  BLOG_UPDATED,
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
  const pageTitle = 'Edit Blog',
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
    updatePost = postData =>
      axios({
        method: 'put',
        url: `${apiURL}/post/id/${postId}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        data: postData,
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
    { isLoading, data } = useQuery(postId, fetchPost, {
      staleTime: Infinity,
      refetchInterval: false,
      select: data => data?.data,
    }),
    { mutateAsync: updateBlog, isLoading: isUpdating } =
      useMutation(updatePost),
    editorRef = useRef(null),
    [title, setTitle] = useState(''),
    [featuredImg, setFeaturedImg] = useState(null),
    [slug, setSlug] = useState(''),
    [body, setContent] = useState(''),
    pickerCallback = useCallback((callback, value, meta) => {
      if (meta.filetype === 'image') {
        var input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = function () {
          var file = input.files[0]
          var reader = new FileReader()
          reader.onload = function (e) {
            callback(e.target.result, {
              alt: file.name,
            })
          }
          reader.readAsDataURL(file)
        }
      }
    }, []),
    handleSubmit = async event => {
      event.preventDefault()
      const postData = new FormData()
      postData.append('title', title)
      postData.append('body', body)
      featuredImg &&
        postData.append('featuredImg', featuredImg, featuredImg?.name)
      try {
        const res = await updateBlog(postData)
        console.log('🚀 ~ file: defaultView.js ~ line 122 ~ res', res)
        updateAppStore({
          type: BLOG_UPDATED,
          payload: {
            notification: {
              code: BLOG_UPDATED,
              color: 'success',
              message: 'Blog updated successfully',
            },
          },
        })
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
      }
    }

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setSlug(data.slug)
      setContent(data.body)
    }
    updateAppStore({
      type: TITLE_UPDATE,
      payload: {
        pageTitle: pageTitle,
      },
    })
  }, [updateAppStore, data])

  if (isLoading) {
    return (
      <div className={'d-flex h-100 align-items-center justify-content-center'}>
        <div
          className={'spinner-border spinner-border-sm text-admin'}
          role={'status'}
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className={'visually-hidden'}>Loading...</span>
        </div>
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
          value={title}
          required={true}
        />
      </div>
      <div className={'form-group mb-3'}>
        <strong className={'form-label me-2'}>View Post:</strong>
        <Link target={'_blank'} to={`/${slug}`}>
          {`${window.origin}/${slug}`}
        </Link>
      </div>
      <div className={'form-group mb-3'}>
        <label htmlFor={'featuredImg'} className={'form-label'}>
          Image
        </label>
        <input
          className={'form-control'}
          id={'featuredImg'}
          name={'featuredImg'}
          type={'file'}
          accept={'image/*'}
          onChange={({
            target: {
              files: [file],
            },
          }) => setFeaturedImg(file)}
        />
        <div className={'image mt-2'}>
          <img
            alt={`post-${postId}`}
            src={getPostImageURL(postId)}
            className={'img-fluid'}
            style={{ maxWidth: '150px' }}
          />
        </div>
      </div>
      <div className={'form-group mb-3'}>
        <label htmlFor={'content'} className={'form-label'}>
          Content
        </label>
        <Editor
          apiKey={'slam4hctjihwvvlza5dl8s8xe4vk5q07o06zmwnht0z5ue42'}
          id={'content'}
          onInit={(evt, editor) => {
            return (editorRef.current = editor)
          }}
          onBlur={({ target }) => {
            const value = target.getContent({ format: 'html' })
            setContent(value)
          }}
          initialValue={body}
          init={{
            ...editorConfig,
            file_picker_callback: pickerCallback,
          }}
        />
      </div>
      <div className={'form-group'}>
        <Button
          type={'submit'}
          id={'update-post'}
          variant={'admin'}
          className={'btn-lg'}
          disabled={isUpdating}
          style={{ minWidth: '120px' }}
        >
          {isUpdating ? (
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
