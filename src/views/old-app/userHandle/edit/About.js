import React, { useCallback, useContext, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'

import { AppContext } from 'src/AppContext'
import { useLocalStorage } from 'src/hooks'
import { decrypt, encrypt } from 'src/helpers/Utils'
import {
  PROFILE_NAME_UPDATED,
  PROFILE_UPDATE_FAILED,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const About = () => {
  const {
      appStore: { user, userStorageKey, apiURL },
      updateAppStore,
    } = useContext(AppContext),
    editorRef = useRef(null),
    [appUser, setAppUser] = useLocalStorage(userStorageKey, encrypt(user)),
    [firstName, setFirstName] = useState(user.first_name),
    [lastName, setLastName] = useState(user.last_name),
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
    setFullName = value => {
      if (value.includes(' ')) {
        const FullName = value.split(' ')
        setLastName(FullName.pop())
        setFirstName(FullName.join(' '))
      } else {
        setFirstName(value)
      }
    },
    handleSubmit = async event => {
      event.preventDefault()
      try {
        const updateData = {
            first_name: firstName,
            last_name: lastName,
          },
          nameRequest = await fetch(`${apiURL}/member/profile-name/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              language: 'en',
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(updateData),
          })
        // Request Access Token From API
        if (nameRequest.ok) {
          const data = await nameRequest.json()
          if (data.API_STATUS) {
            const appUserData = decrypt(appUser),
              updatedUser = encrypt({
                ...appUserData,
                ...updateData,
              })
            setAppUser(updatedUser)
            updateAppStore({
              type: PROFILE_NAME_UPDATED,
              payload: {
                notification: {
                  code: PROFILE_NAME_UPDATED,
                  color: 'success',
                  message: data.message,
                },
                user: updatedUser,
              },
            })
          } else {
            updateAppStore({
              type: PROFILE_UPDATE_FAILED,
              payload: {
                error: {
                  code: PROFILE_UPDATE_FAILED,
                  color: 'danger',
                  message: data.message,
                },
              },
            })
          }
        } else {
          throw new Error('Unexpected Error')
        }
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

  false && console.log(user)
  return (
    <Form onSubmit={event => handleSubmit(event)} className={'mb-3'}>
      <fieldset className={'border p-2'}>
        <legend className={'w-auto float-none mb-0 px-3'}>About</legend>
        <Form.Group className={'mb-3'}>
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type={'text'}
            placeholder={'Enter Full Name'}
            defaultValue={`${firstName} ${lastName}`}
            onChange={({ target: { value } }) => setFullName(value)}
          />
        </Form.Group>
        <Form.Group className={'mb-3'}>
          <Form.Label>About Me</Form.Label>
          <Editor
            apiKey="slam4hctjihwvvlza5dl8s8xe4vk5q07o06zmwnht0z5ue42"
            onInit={(evt, editor) => {
              return (editorRef.current = editor)
            }}
            initialValue={''}
            init={{
              branding: false,
              selector: 'textarea',
              resize: false,
              placeholder: 'Type here...',
              height: 250,
              menubar: false,
              statusbar: true,
              image_title: true,
              automatic_uploads: true,
              file_picker_types: 'image',
              paste_data_images: true,
              file_picker_callback: pickerCallback,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help fullscreen',
              ],
              fullscreen_native: true,
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic underline backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | image fullscreen |' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            }}
          />
        </Form.Group>
        <Form.Group className={'mb-3'}>
          <Form.Label>Highest Qualification</Form.Label>
          <Form.Select aria-label="Highest Qualification">
            <option>Select Your Highest Qualification</option>
            <option value="kg">Kindergarten (KG)</option>
            <option value="ps">Primary School (PS)</option>
            <option value="ms">Middle School (MS)</option>
            <option value="hs">High School (HS)</option>
            <option value="g">Graduate (G)</option>
            <option value="pg">Post Graduate (PG)</option>
            <option value="phd">Doctor of Philosophy (PhD)</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className={'mb-3'}>
          <Form.Label>Qualification</Form.Label>
          <Form.Control type="text" placeholder="Mention Qualification" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </fieldset>
    </Form>
  )
}

export default About
