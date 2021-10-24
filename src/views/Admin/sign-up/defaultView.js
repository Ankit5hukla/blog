import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Button, OutlineButton } from 'src/components/Buttons'
import { generatePassword } from 'src/helpers/Utils'

import { AppContext } from 'src/AppContext'
import { useCopyToClipboard, useDebounce } from 'src/hooks'
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  UNEXPECTED_ERROR,
  PASSWORD_COPY_TO_CLIPBOARD,
} from 'src/constants/actions'

const SignUp = ({
  history,
  match: {
    params: { signUpEmail },
  },
}) => {
  const {
    appStore: { apiURL },
    updateAppStore,
  } = useContext(AppContext)
  const [userExists, setUserExists] = useState(false),
    [email, setEmail] = useState(''),
    [username, setUsername] = useState(''),
    [name, setName] = useState(''),
    [password, setPassword] = useState(''),
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
    handleSubmit = async event => {
      event.preventDefault()
      const newPasswordField = document.getElementById('new-password')
      newPasswordField.type = 'password'
      try {
        const registerRequest = await fetch(`${apiURL}/auth/sign-up`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            username,
            password,
          }),
        })
        if (registerRequest.ok) {
          const data = await registerRequest.json()
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
          const data = await registerRequest.json()
          registerRequest.status === 403 && setUserExists(true)
          updateAppStore({
            type: REGISTER_USER_ERROR,
            payload: {
              error: {
                code: REGISTER_USER_ERROR,
                color: 'danger',
                message: data.error,
              },
            },
          })
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
    5500,
    [password]
  )

  useEffect(() => {
    signUpEmail && setEmail(signUpEmail)
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
  }, [signUpEmail, password, oldGenPassword, copySuccess, updateAppStore])

  return (
    <section className={'user-authorize'}>
      <div className={'auth-box'}>
        <div className={'Info-card'}>
          <div className={'card-heading'}>
            <h5>{`Register New User`}</h5>
          </div>
          <form autoComplete={'off'} onSubmit={event => handleSubmit(event)}>
            <div className={'form-group'}>
              <input
                className={`form-data${userExists ? ` invalid` : ``}`}
                type={'email'}
                placeholder={'Enter your email'}
                onChange={({ target: { value } }) => {
                  setEmail(value)
                  setUserExists(false)
                }}
                value={email}
                title={userExists ? `Email already taken` : undefined}
                required={true}
              />
            </div>
            <div className={'form-group'}>
              <input
                className={`form-data${userExists ? ` invalid` : ``}`}
                type={'text'}
                placeholder={'Enter your username'}
                value={username}
                onChange={({ target: { value } }) => {
                  setUsername(value)
                  setUserExists(false)
                }}
                title={userExists ? `Username already taken` : undefined}
                required={true}
              />
            </div>
            <div className={'form-group'}>
              <input
                className={'form-data'}
                type={'text'}
                name={'full-name'}
                autoComplete={'full-name'}
                value={name}
                onChange={({ target: { value } }) => setName(value)}
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
            <div className={'form-group'}>
              <Button type={'submit'} variant={'app'} label={'Register'} />
            </div>
          </form>
          <div className={'Info-card-footer'}>
            <ul>
              <li>
                <NavLink to={'/admin/login'}>
                  <span>Already have an LMSI account? Log in</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
