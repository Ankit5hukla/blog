import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useMutation } from 'react-query'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { editorConfig } from 'src/constants/defaultValues'
import {
  BLOG_CREATED,
  TITLE_UPDATE,
  TOKEN_EXPIRED,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const AddBlog = ({
  history,
  match: {
    params: { postId },
  },
}) => {
  const pageTitle = 'Add Blog',
    {
      appStore: { apiURL, user },
      updateAppStore,
    } = useContext(AppContext),
    createPost = postData =>
      axios({
        method: 'post',
        url: `${apiURL}/post/create`,
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
    { mutateAsync: createNewBlog, isLoading } = useMutation(createPost),
    editorRef = useRef(null),
    [title, setTitle] = useState(''),
    [body, setContent] = useState(''),
    [featuredImg, setFeaturedImg] = useState(null),
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
        const res = await createNewBlog(postData)
        res.data._id &&
          updateAppStore({
            type: BLOG_CREATED,
            payload: {
              notification: {
                code: BLOG_CREATED,
                color: 'success',
                message: 'Blog created successfully',
              },
            },
          })
        history.push(`/admin/edit/${res.data._id}`)
      } catch (error) {
        updateAppStore({
          type: UNEXPECTED_ERROR,
          payload: {
            error: {
              code: UNEXPECTED_ERROR,
              color: 'warning',
              message: error.message,
            },
          },
        })
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
          id={'create-post'}
          variant={'admin'}
          className={'btn-lg'}
          disabled={isLoading}
          style={{ minWidth: '120px' }}
        >
          {isLoading ? (
            <div
              className={'spinner-border spinner-border-sm text-light'}
              role={'status'}
            >
              <span className={'visually-hidden'}>Loading...</span>
            </div>
          ) : (
            'Create'
          )}
        </Button>
      </div>
    </form>
  )
}

export default AddBlog
