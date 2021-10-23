import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'

import { AppContext } from 'src/AppContext'
import { isBrowser } from 'src/helpers/Utils'
import {
  INSTITUTE_CREATED,
  INSTITUTE_CREATION_FAILED,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const Institute = ({ userHandle }) => {
  const {
      appStore: { user, apiURL },
      updateAppStore,
    } = useContext(AppContext),
    [instituteName, setInstituteName] = useState(''),
    [instituteHandleName, setInstituteHandleName] = useState(''),
    handleSubmit = async event => {
      event.preventDefault()
      try {
        const createData = {
            institute_name: instituteName,
            institute_handle_name: instituteHandleName,
          },
          changeRequest = await fetch(`${apiURL}/instructor/institute/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              language: 'en',
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(createData),
          })
        if (changeRequest.ok) {
          const data = await changeRequest.json()
          if (data.API_STATUS) {
            setInstituteName('')
            setInstituteHandleName('')
            updateAppStore({
              type: INSTITUTE_CREATED,
              payload: {
                notification: {
                  code: INSTITUTE_CREATED,
                  color: 'success',
                  message: data.message,
                },
              },
            })
          } else {
            updateAppStore({
              type: INSTITUTE_CREATION_FAILED,
              payload: {
                error: {
                  code: INSTITUTE_CREATION_FAILED,
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

  return (
    <Form className={'mb-3'} onSubmit={event => handleSubmit(event)}>
      <fieldset className={'border border-success p-2'}>
        <legend className={'w-auto float-none mb-0 px-3'}>
          Create New Institute
        </legend>
        <Form.Group className="mb-3" controlId="instituteName">
          <Form.Label>Institute Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Institute Name"
            value={instituteName}
            onChange={({ target: { value } }) => setInstituteName(value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="instituteHandleName">
          <Form.Label>Institute Handle Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Institute Handle Name"
            value={instituteHandleName}
            onChange={({ target: { value } }) => setInstituteHandleName(value)}
          />
          <Form.Text>
            {isBrowser && <span>{window.location.origin}</span>}
            <span>{`/app/`}</span>
            <strong>{userHandle}</strong>
            <span>{`/{`}</span>
            <strong>
              {instituteHandleName !== ''
                ? instituteHandleName
                : '____________'}
            </strong>
            <span>{`}`}</span>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          submit
        </Button>
      </fieldset>
    </Form>
  )
}

export default Institute
