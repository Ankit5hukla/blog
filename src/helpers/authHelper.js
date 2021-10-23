import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { LOGOUT_USER } from 'src/constants/actions'

export const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const {
      appStore: { isAuthGuardActive, user },
    } = useContext(AppContext),
    setComponent = props => {
      if (isAuthGuardActive) {
        if (user) {
          if (roles) {
            if (roles.includes(user.role_id)) {
              return <Component {...props} />
            }
            return (
              <Redirect
                to={{
                  pathname: '/unauthorized',
                  state: { from: props.location },
                }}
              />
            )
          }
          return <Component {...props} />
        }
        return (
          <Redirect
            to={{
              pathname: `/auth/sign-in/${window.btoa(props.location.pathname)}`,
              state: {
                notification: {
                  code: LOGOUT_USER,
                  color: 'app',
                  message: 'User logged out.',
                },
              },
            }}
          />
        )
      }
      return <Component {...props} />
    }

  return <Route {...rest} render={setComponent} />
}
