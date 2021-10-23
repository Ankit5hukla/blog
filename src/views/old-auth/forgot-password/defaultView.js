import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'src/components/Buttons'

import { AppContext } from 'src/AppContext'
import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const ForgotPassword = () => {
  const {
    appStore: { apiURL },
    updateAppStore,
  } = useContext(AppContext)
  const [email, setEmail] = useState(''),
    handleSubmit = async event => {
      event.preventDefault()

      try {
        // Request Access Token From API
        const forgotRequest = await fetch(`${apiURL}/member/password-reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            language: 'en',
          },
          body: JSON.stringify({
            email,
          }),
        })
        if (forgotRequest.ok) {
          const data = await forgotRequest.json()
          if (data.API_STATUS) {
            updateAppStore({
              type: FORGOT_PASSWORD_SUCCESS,
              payload: {
                notification: {
                  code: FORGOT_PASSWORD_SUCCESS,
                  color: 'success',
                  message: data.message,
                },
              },
            })
          } else {
            updateAppStore({
              type: FORGOT_PASSWORD_ERROR,
              payload: {
                error: {
                  code: FORGOT_PASSWORD_ERROR,
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
    <>
      <div className={'Info-card'}>
        <div className={'card-heading'}>
          <h5>Can't log in?</h5>
        </div>
        <form autoComplete={'off'} onSubmit={event => handleSubmit(event)}>
          <label className={'input-label mt-4'} htmlFor={'email'}>
            We'll send a recovery link to
          </label>
          <div className={'form-group mt-0'}>
            <input
              className={`form-data`}
              type={'email'}
              placeholder={'Enter your email address'}
              onChange={({ target: { value } }) => {
                setEmail(value)
              }}
              defaultValue={email}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <Button
              type={'submit'}
              variant={'app'}
              label={'Send recovery link'}
            />
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
              <NavLink to={'#'}>
                <span>Login help</span>
              </NavLink>
            </li>
            <p style={{ margin: '0px 8px' }}>•</p>
            <li>
              <NavLink to={`#`}>
                <span>Contact Support</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
