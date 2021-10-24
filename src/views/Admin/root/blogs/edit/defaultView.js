import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { editorConfig } from 'src/constants/defaultValues'
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
    { isLoading, data } = useQuery(postId, fetchPost, {
      staleTime: Infinity,
      refetchInterval: false,
      select: data => data?.data,
    }),
    editorRef = useRef(null),
    [title, setTitle] = useState(''),
    [body, setContent] = useState(''),
    [btnDisable, setBtnDisable] = useState(false),
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
    handleSubmit = event => {
      try {
        event.preventDefault()
        setBtnDisable(true)
        console.log({ title, body })
        setTimeout(() => {
          setBtnDisable(false)
        }, 3000)
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
      // finally {
      //   setBtnDisable(false)
      // }
    }

  useEffect(() => {
    if (data) {
      setTitle(data.title)
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
        <label htmlFor={'image'} className={'form-label'}>
          Image
        </label>
        <input
          className={'form-control'}
          id={'image'}
          type={'file'}
          onChange={({ target: { value } }) => setTitle(value)}
        />
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
          variant={'admin'}
          className={'btn-lg'}
          disabled={btnDisable}
          style={{ minWidth: '120px' }}
        >
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
