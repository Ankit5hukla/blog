import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

import { AppContext } from 'src/AppContext'
import { Button } from 'src/components/Buttons'
import { useDebounce, useIsMounted, useLocalStorage } from 'src/hooks'
import { LOGOUT_USER } from 'src/constants/actions'
import { userStorageKey } from 'src/constants/defaultValues'
import Logo from 'src/assets/svg/logo'

const Header = () => {
  const {
      appStore: { user },
      updateAppStore,
    } = useContext(AppContext),
    isMounted = useIsMounted(),
    [appUser, setAppUser] = useLocalStorage(userStorageKey, null),
    doLogOut = () => {
      if (appUser) {
        isMounted.current && setAppUser(null)
      }
    }

  useDebounce(
    () => {
      updateAppStore({
        type: LOGOUT_USER,
        payload: {
          notification: {
            code: LOGOUT_USER,
            color: 'app',
            message: 'User logged out.',
          },
        },
      })
    },
    100,
    [appUser]
  )

  return (
    <Navbar
      bg="white"
      expand={'lg'}
      className={'shadow-none border-bottom py-4'}
    >
      <div className={'container'}>
        <Link to={'/'} className={'left'}>
          <Logo />
        </Link>
        {user === null ? (
          <div className={'right'}>
            <Link
              to={'/admin/sign-up'}
              className={'btn btn-lg btn-link text-decoration-none px-3'}
            >
              Sign Up
            </Link>
            <span className={'me-3'}>or</span>
            <Link
              to={'/admin/login'}
              className={'btn btn-lg btn-outline-app text-decoration-none px-5'}
            >
              Log In
            </Link>
          </div>
        ) : (
          <div className={'right'}>
            <p>
              Welcome{' '}
              <Link
                to={'/admin'}
                className={'p-0 text-decoration-none text-admin'}
              >
                <strong>{user?.user.name}</strong>
              </Link>{' '}
              <Button
                variant={'link'}
                className={'p-0 text-decoration-none'}
                onClick={doLogOut}
              >
                Logout
              </Button>
            </p>
          </div>
        )}
      </div>
    </Navbar>
  )
}

export default Header
