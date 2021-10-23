import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { useDebounce, useLocalStorage } from 'src/hooks'
import { Button } from 'src/components/Buttons'
import { encrypt, isBrowser } from 'src/helpers/Utils'
import { Icon, GoogleIcon } from 'src/components/Icon'
import { userStorageKey } from 'src/constants/defaultValues'
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ERROR,
  LOGOUT_USER,
} from 'src/constants/actions'

const SignIn = ({
  history,
  location: { state: redirectionState },
  match: {
    params: { redirectTo },
  },
}) => {
  const {
      appStore: { apiURL, appRoot, user: loggedInUser },
      updateAppStore,
    } = useContext(AppContext),
    [appUser, setAppUser] = useLocalStorage(userStorageKey, null),
    [alowLogin, setAlowLogin] = useState(false),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [btnDisable, setBtnDisable] = useState(false),
    handleSubmit = async event => {
      event.preventDefault()
      setBtnDisable(true)
      if (!alowLogin) {
        // Check Email Existence From API
        const checkRequest = await fetch(
          `${apiURL}/member/check-email/exists`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              language: 'en',
            },
            body: JSON.stringify({ email }),
          }
        )
        try {
          if (checkRequest.ok) {
            const data = await checkRequest.json()
            if (data.EMAIL_EXISTS) {
              setAlowLogin(true)
            } else {
              history.push(`/auth/sign-up/learner/email/${email}`)
            }
          } else {
            throw new Error('Unexpected Error')
          }
        } catch (err) {
          console.error(err.message)
        } finally {
          setBtnDisable(false)
        }
      } else {
        // Request Access Token From API
        const loginRequest = await fetch(`${apiURL}/member/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            language: 'en',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        try {
          if (loginRequest.ok) {
            const data = await loginRequest.json()
            if (data.API_STATUS) {
              const user = encrypt(data.response)
              isBrowser && setAppUser(user)
              // history.push(redirectTo ? window.atob(redirectTo) : appRoot)
            } else {
              updateAppStore({
                type: LOGIN_FAILED,
                payload: {
                  error: {
                    code: LOGIN_FAILED,
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
            type: LOGIN_ERROR,
            payload: {
              error: {
                code: LOGIN_ERROR,
                color: 'warning',
                message: err.message,
              },
            },
          })
        } finally {
          setBtnDisable(false)
        }
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
          redirectTo: redirectTo ? window.atob(redirectTo) : appRoot,
          user: appUser,
        },
      })
    },
    100,
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
    <>
      <div className={'Info-card'}>
        <div className={'card-heading'}>
          <h5>Log in to your account</h5>
        </div>
        <form onSubmit={event => handleSubmit(event)}>
          <div className={'form-group'}>
            <input
              className={'form-data'}
              type={'email'}
              onChange={({ target: { value } }) => setEmail(value)}
              placeholder={'Enter your email address'}
              defaultValue={email}
              disabled={btnDisable || alowLogin}
              required
            />
          </div>
          {alowLogin && (
            <div className={'form-group'}>
              <input
                className={'form-data'}
                type={'password'}
                onChange={({ target: { value } }) => setPassword(value)}
                defaultValue={password}
                disabled={btnDisable}
                placeholder={'Enter your password'}
              />
            </div>
          )}
          <div className={'form-group'}>
            <Button type={'submit'} variant={'app'} disabled={btnDisable}>
              {btnDisable ? (
                <div
                  className={'spinner-border spinner-border-sm text-light'}
                  role={'status'}
                >
                  <span className={'visually-hidden'}>Loading...</span>
                </div>
              ) : alowLogin ? (
                'Log in'
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
        <p className={'d-block text-center fs-sm fw-bold my-3'}>OR</p>
        <div className={'social-login'} title={'Coming Soon'}>
          <Button
            className={'d-flex w-100 border'}
            variant={'light'}
            disabled={true}
          >
            <GoogleIcon className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With Google
            </span>
          </Button>
          <Button
            className={'d-flex w-100 border'}
            variant={'light'}
            disabled={true}
          >
            <Icon icon={'facebook'} className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With Facebook
            </span>
          </Button>
          <Button
            className={'d-flex w-100 border'}
            variant={'light'}
            disabled={true}
          >
            <Icon icon={'instagram'} className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With Instagram
            </span>
          </Button>
          <Button
            className={'d-flex w-100 border'}
            variant={'light'}
            disabled={true}
          >
            <Icon icon={'linkedin'} className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With LinkedIn
            </span>
          </Button>
        </div>
        <div className={'Info-card-footer'}>
          <ul>
            <li>
              <NavLink to={'/auth/forgot-password'}>
                <span>Can't log in?</span>
              </NavLink>
            </li>
            <p style={{ margin: '0px 8px' }}>•</p>
            <li>
              <NavLink to={`/auth/sign-up`}>
                <span>Register for an account</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={'footer-top'}>
        <ul>
          <li>
            <NavLink to={'/'}>
              <span>Privacy Policy</span>
            </NavLink>
          </li>
          <p style={{ margin: '0px 8px' }}>•</p>
          <li>
            <NavLink to={'/'}>
              <span>User Notice</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SignIn
