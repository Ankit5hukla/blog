import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { AppContext } from 'src/AppContext'
import {
  PASSWORD_UPDATED,
  PASSWORD_UPDATE_FAILED,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const Security = () => {
  const {
      appStore: { user, apiURL },
      updateAppStore,
    } = useContext(AppContext),
    [currentPassword, setCurrentPassword] = useState(''),
    [newPassword, setNewPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState(''),
    handleSubmit = async event => {
      event.preventDefault()
      try {
        if (newPassword === confirmPassword) {
          const updateData = {
              previousPassword: currentPassword,
              newPassword: newPassword,
            },
            changeRequest = await fetch(`${apiURL}/member/change/password`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                language: 'en',
                Authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify(updateData),
            })
          // Request Access Token From API
          if (changeRequest.ok) {
            const data = await changeRequest.json()
            if (data.API_STATUS) {
              setCurrentPassword('')
              setNewPassword('')
              setConfirmPassword('')
              updateAppStore({
                type: PASSWORD_UPDATED,
                payload: {
                  notification: {
                    code: PASSWORD_UPDATED,
                    color: 'success',
                    message: data.message,
                  },
                },
              })
            } else {
              updateAppStore({
                type: PASSWORD_UPDATE_FAILED,
                payload: {
                  error: {
                    code: PASSWORD_UPDATE_FAILED,
                    color: 'danger',
                    message: data.message,
                  },
                },
              })
            }
          } else {
            throw new Error('Unexpected Error')
          }
        } else {
          throw new Error('New Password and Confirm Password mismatch')
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

  false && console.log(user, handleSubmit)
  return (
    <Form className={'mb-3'} onSubmit={event => handleSubmit(event)}>
      <fieldset className={'border border-success p-2'}>
        <legend className={'w-auto float-none mb-0 px-3'}>Security</legend>
        <Form.Group className="mb-3" controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={({ target: { value } }) => setCurrentPassword(value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={({ target: { value } }) => setNewPassword(value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </fieldset>
    </Form>
  )
}

export default Security
