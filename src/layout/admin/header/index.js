import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from 'src/components/Buttons'
import { AppContext } from 'src/AppContext'
import { useDebounce, useIsMounted, useLocalStorage } from 'src/hooks'
import { LOGOUT_USER } from 'src/constants/actions'
import { userStorageKey } from 'src/constants/defaultValues'
import { isBrowser } from 'src/helpers/Utils'

const Header = () => {
  const {
      appStore: { user, pageTitle },
      updateAppStore,
    } = useContext(AppContext),
    isMounted = useIsMounted(),
    history = useHistory(),
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
          history,
          pathname: `/admin/login/`,
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
    <div className={'container-fluid'}>
      <div className={'card mt-4 p-3'}>
        <div className={'d-flex justify-content-between'}>
          <div className={'my-auto flex-grow-1'}>
            <h1 className={'page-title'}>{pageTitle}</h1>
            {isBrowser && window.location.pathname !== '/admin' && (
              <Link to={'/admin'} className={'btn btn-link p-0'}>
                Go Back
              </Link>
            )}
            <p>
              Welcome <strong>{user?.user.name}</strong>{' '}
              <Button
                variant={'link'}
                className={'p-0 text-decoration-none'}
                onClick={doLogOut}
              >
                Logout
              </Button>
            </p>
          </div>
          <div className={'my-auto'}>
            {isBrowser && window.location.pathname === '/admin' && (
              <Link to={'/admin/add'} className={'btn btn-admin'}>
                Add Blog
              </Link>
            )}
            {isBrowser && window.location.pathname === '/admin/add' && (
              <Button
                variant={'admin'}
                className={'btn btn-lg'}
                onClick={() => {
                  if (isBrowser) {
                    document.getElementById('create-post').click()
                  }
                }}
                style={{ minWidth: '120px' }}
              >
                Create
              </Button>
            )}
            {isBrowser && window.location.pathname.includes('/admin/edit/') && (
              <Button
                variant={'admin'}
                className={'btn btn-lg'}
                onClick={() => {
                  if (isBrowser) {
                    const updateBtn = document.getElementById('update-post')
                    !updateBtn.disabled && updateBtn.click()
                  }
                }}
                style={{ minWidth: '120px' }}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
