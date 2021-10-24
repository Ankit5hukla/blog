import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { useDebounce, useLocalStorage } from 'src/hooks'
import { Button } from 'src/components/Buttons'
import { encrypt, isBrowser } from 'src/helpers/Utils'
import { userStorageKey } from 'src/constants/defaultValues'
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
  UNEXPECTED_ERROR,
} from 'src/constants/actions'

const SignIn = ({ location: { state: redirectionState } }) => {
  const {
      appStore: { apiURL, appRoot, user: loggedInUser },
      updateAppStore,
    } = useContext(AppContext),
    history = useHistory(),
    [appUser, setAppUser] = useLocalStorage(userStorageKey, null),
    [userID, setUserID] = useState(''),
    [password, setPassword] = useState(''),
    [btnDisable, setBtnDisable] = useState(false),
    handleSubmit = async event => {
      event.preventDefault()
      setBtnDisable(true)
      // Request Access Token From API
      try {
        const loginRequest = await fetch(`${apiURL}/auth/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            password,
          }),
        })
        if (loginRequest.ok) {
          const data = await loginRequest.json()
          isBrowser && setAppUser(encrypt(data))
        } else {
          const data = await loginRequest.json()
          updateAppStore({
            type: LOGIN_FAILED,
            payload: {
              error: {
                code: LOGIN_FAILED,
                color: 'danger',
                message: data.error,
              },
            },
          })
        }
      } catch (err) {
        console.log(err.message)
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

  useDebounce(
    () => {
      updateAppStore({
        type: LOGIN_USER,
        payload: {
          history,
          notification: {
            code: LOGIN_SUCCESS,
            color: 'success',
            message: 'Login Successful...',
          },
          redirectTo: `/admin`,
          user: appUser,
        },
      })
    },
    500,
    [appUser]
  )

  useEffect(() => {
    if (loggedInUser) {
      history.push(appRoot)
    }
    if (redirectionState && redirectionState.notification) {
      updateAppStore({
        type: LOGOUT_USER,
        payload: {
          notification: redirectionState.notification,
        },
      })
      delete redirectionState.notification
      history.replace(history.location.pathname, redirectionState)
    }
  }, [loggedInUser, updateAppStore, redirectionState, history, appRoot])

  return (
    <section className={'user-authorize'}>
      <div className={'auth-box'}>
        <div className={'Info-card'}>
          <div className={'card-heading'}>
            <h5>Log in to your account</h5>
          </div>
          <form onSubmit={event => handleSubmit(event)}>
            <div className={'form-group'}>
              <input
                className={'form-data'}
                type={'text'}
                onChange={({ target: { value } }) => setUserID(value)}
                placeholder={'Enter your username or email'}
                value={userID}
                disabled={btnDisable}
                required={true}
              />
            </div>
            <div className={'form-group'}>
              <input
                className={'form-data'}
                type={'password'}
                onChange={({ target: { value } }) => setPassword(value)}
                value={password}
                disabled={btnDisable}
                placeholder={'Enter your password'}
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
                  'Log in'
                )}
              </Button>
            </div>
          </form>
          <div className={'Info-card-footer'}>
            <ul>
              <li>
                <Link to={'/admin/sign-up'}>
                  <span>Don't have an account? Sign Up Now</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn
