import React, { useContext, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { ucFirst, getRoleId } from 'src/helpers/Utils'
import { Button, OutlineButton } from 'src/components/Buttons'
import { Icon, GoogleIcon } from 'src/components/Icon'
import { generatePassword } from 'src/helpers/Utils'

import { AppContext } from 'src/AppContext'
import { useCopyToClipboard, useDebounce } from 'src/hooks'
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  UNEXPECTED_ERROR,
  REGISTER_USER_EXIST,
  PASSWORD_COPY_TO_CLIPBOARD,
} from 'src/constants/actions'

const SignUp = ({
  history,
  match: {
    params: { InstituteId, Method, MethodValue, RoleKey = 'learner' },
  },
}) => {
  const {
    appStore: { apiURL },
    updateAppStore,
  } = useContext(AppContext)
  const [userExists, setUserExists] = useState(false),
    [email, setEmail] = useState(''),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [password, setPassword] = useState(''),
    [institutionId, setInstitutionId] = useState(null),
    [copyToClipboard, { value: oldGenPassword, success: copySuccess }] =
      useCopyToClipboard(),
    generateNewPassword = () => {
      const newPasswordField = document.getElementById('new-password'),
        generatedPassword = generatePassword(15)
      setPassword(generatedPassword)
      newPasswordField.type = 'text'
      if (oldGenPassword !== generatedPassword) {
        copyToClipboard(generatedPassword)
      }
    },
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
      const newPasswordField = document.getElementById('new-password')
      newPasswordField.type = 'password'
      // Check Email Existence From API
      const checkRequest = await fetch(`${apiURL}/member/check-email/exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          language: 'en',
        },
        body: JSON.stringify({ email }),
      })
      try {
        if (checkRequest.ok) {
          const data = await checkRequest.json()
          if (data.EMAIL_EXISTS) {
            setUserExists(data.EMAIL_EXISTS)
            updateAppStore({
              type: REGISTER_USER_EXIST,
              payload: {
                error: {
                  code: REGISTER_USER_EXIST,
                  color: 'danger',
                  message: 'Email already taken.',
                },
              },
            })
          } else {
            try {
              // Request Access Token From API
              const registerRequest = await fetch(`${apiURL}/member/signup`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  language: 'en',
                },
                body: JSON.stringify({
                  first_name: firstName,
                  last_name: lastName,
                  password,
                  email,
                  institutionId,
                  role_id: getRoleId(RoleKey),
                }),
              })
              if (registerRequest.ok) {
                const data = await registerRequest.json()
                if (data.API_STATUS) {
                  updateAppStore({
                    type: REGISTER_USER_SUCCESS,
                    payload: {
                      notification: {
                        code: REGISTER_USER_SUCCESS,
                        color: 'success',
                        message: data.message,
                      },
                      history,
                    },
                  })
                } else {
                  updateAppStore({
                    type: REGISTER_USER_ERROR,
                    payload: {
                      error: {
                        code: REGISTER_USER_ERROR,
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

  useDebounce(
    () => {
      const newPasswordField = document.querySelector('#new-password')
      newPasswordField.type = 'password'
    },
    5000,
    [password]
  )

  useEffect(() => {
    if (Method === 'email') {
      setEmail(MethodValue)
    }
    if (InstituteId) {
      setInstitutionId(InstituteId)
    }
    if (copySuccess || (oldGenPassword && oldGenPassword === password)) {
      updateAppStore({
        type: PASSWORD_COPY_TO_CLIPBOARD,
        payload: {
          notification: {
            code: PASSWORD_COPY_TO_CLIPBOARD,
            color: 'info',
            message: 'Your Password copied to your clipboard.',
          },
        },
      })
    }
  }, [
    Method,
    MethodValue,
    InstituteId,
    password,
    oldGenPassword,
    copySuccess,
    updateAppStore,
  ])

  return (
    <>
      <div className={'Info-card'}>
        <div className={'card-heading'}>
          <h5>{`Register your account ${ucFirst(RoleKey)}`}</h5>
        </div>
        <form autoComplete={'off'} onSubmit={event => handleSubmit(event)}>
          <div className={'form-group'}>
            <input
              className={`form-data${userExists ? ` invalid` : ``}`}
              type={'email'}
              placeholder={'Enter your email address'}
              onChange={({ target: { value } }) => {
                setEmail(value)
                setUserExists(false)
              }}
              defaultValue={email}
              title={userExists ? `Email already taken` : undefined}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <input
              className={'form-data'}
              type={'text'}
              name={'full-name'}
              autoComplete={'full-name'}
              onChange={({ target: { value } }) => setFullName(value)}
              placeholder={'Enter your full name'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <input
              className={'form-data'}
              type={'password'}
              id={'new-password'}
              name={'new-password'}
              autoComplete={'new-password'}
              onChange={({ target: { value } }) => {
                setPassword(value)
              }}
              value={password}
              placeholder={'Enter your password'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <OutlineButton
              type={'button'}
              variant={'app'}
              onClick={() => generateNewPassword()}
            >
              Generate Strong Password
            </OutlineButton>
          </div>
          <div className={'term-conditions'}>
            <span>
              By signing up, user will be accepting the LMSI{' '}
              <NavLink to={'/'}>
                <span>Terms of Service</span>
              </NavLink>{' '}
              and acknowledging the{' '}
              <NavLink to={'/'}>
                <span>Privacy Policy</span>
              </NavLink>
            </span>
          </div>
          <div className={'form-group'}>
            <Button type={'submit'} variant={'app'} label={'Register'} />
          </div>
        </form>
        <h6 className={'text-center my-3'}>
          <small>OR</small>
        </h6>
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
            <Icon icon={'linkedin'} className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With LinkedIn
            </span>
          </Button>
          <Button
            className={'d-flex w-100 border'}
            variant={'light'}
            disabled={true}
          >
            <Icon icon={'twitter'} className={'my-auto'} />
            <span className={'flex-grow-1 text-center'}>
              Continue With Twitter
            </span>
          </Button>
        </div>
        <div className={'Info-card-footer'}>
          <ul>
            <li>
              <NavLink to={'/auth/sign-in'}>
                <span>Already have an LMSI account? Log in</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={'footer-top'}>
        <span>
          This page is protected by reCAPTCHA and the Google{' '}
          <NavLink to={'#'}>
            <span>Privacy Policy</span>
          </NavLink>{' '}
          and{' '}
          <NavLink to={'#'}>
            <span>Terms of Service</span>
          </NavLink>{' '}
          apply
        </span>
      </div>
    </>
  )
}

export default SignUp
