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
      appStore: { user },
    } = useContext(AppContext),
    setComponent = props => {
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
            pathname: `/admin/login`,
            state: {
              notification: {
                code: LOGOUT_USER,
                color: 'warning',
                message: 'Please login to your account.',
              },
            },
          }}
        />
      )
    }

  return <Route {...rest} render={setComponent} />
}
