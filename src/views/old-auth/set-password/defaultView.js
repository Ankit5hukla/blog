import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'src/components/Buttons'

import { AppContext } from 'src/AppContext'
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_MISMATCH,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const SetPassword = ({
  history,
  match: {
    params: { token },
  },
}) => {
  const {
    appStore: { apiURL },
    updateAppStore,
  } = useContext(AppContext)
  const [newPassword, setNewPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState(''),
    handleSubmit = async event => {
      event.preventDefault()
      if (newPassword === confirmPassword) {
        try {
          // Request Access Token From API
          const resetRequest = await fetch(
            `${apiURL}/member/reset/password/${token}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                language: 'en',
              },
              body: JSON.stringify({
                newPassword: confirmPassword,
              }),
            }
          )
          if (resetRequest.ok) {
            const data = await resetRequest.json()
            if (data.API_STATUS) {
              updateAppStore({
                type: RESET_PASSWORD_SUCCESS,
                payload: {
                  notification: {
                    code: RESET_PASSWORD_SUCCESS,
                    color: 'success',
                    message: data.message,
                  },
                  history,
                },
              })
            } else {
              updateAppStore({
                type: RESET_PASSWORD_ERROR,
                payload: {
                  error: {
                    code: RESET_PASSWORD_ERROR,
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
      } else {
        updateAppStore({
          type: RESET_PASSWORD_MISMATCH,
          payload: {
            notification: {
              code: RESET_PASSWORD_MISMATCH,
              color: 'info',
              message: 'New password and Confirm password mismatch',
            },
          },
        })
      }
    }

  return (
    <>
      <div className={'Info-card'}>
        <div className={'card-heading'}>
          <h5>Set your new password</h5>
        </div>
        <form onSubmit={event => handleSubmit(event)}>
          <div className={'form-group'}>
            <input
              autoComplete={'new-password'}
              className={'form-data'}
              id="new-password"
              type="password"
              placeholder="Enter your new password"
              onChange={({ target: { value } }) => {
                setNewPassword(value)
              }}
              defaultValue={newPassword}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <input
              autoComplete={'confirm-password'}
              className={'form-data'}
              id="confirm-password"
              type="password"
              placeholder="Confirm your new password"
              onChange={({ target: { value } }) => {
                setConfirmPassword(value)
              }}
              defaultValue={confirmPassword}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <Button type="submit" variant="app" label="Change password" />
          </div>
        </form>
        <div className={'Info-card-footer'}>
          <ul>
            <li>
              <NavLink to={'/auth/sign-in'}>
                <span>Return to log in</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={'footer-top'}>
        <div>
          <ul>
            <li>
              <NavLink to={'/'}>
                <span>Login help</span>
              </NavLink>
            </li>
            <p style={{ margin: '0px 8px' }}>•</p>
            <li>
              <NavLink to={`/`}>
                <span>Contact Support</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SetPassword
