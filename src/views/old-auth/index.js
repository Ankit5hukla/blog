import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthLayout from 'src/layout/auth'

const ViewSignIn = React.lazy(() => import('./sign-in'))
const ViewSignUp = React.lazy(() => import('./sign-up'))
const ForgotPassword = React.lazy(() => import('./forgot-password'))
const SetPassword = React.lazy(() => import('./set-password'))
const VerifyEmail = React.lazy(() => import('./verify-email'))

const ViewAuth = ({ match }) => {
  return (
    <AuthLayout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/sign-in`} />
        <Route
          path={`${match.url}/sign-in`}
          render={props => <ViewSignIn {...props} />}
        />
        <Route
          path={`${match.url}/sign-up`}
          render={props => <ViewSignUp {...props} />}
        />
        <Route
          path={`${match.url}/forgot-password`}
          render={props => <ForgotPassword {...props} />}
        />
        <Route
          path={`${match.url}/set-password`}
          render={props => <SetPassword {...props} />}
        />
        <Route
          path={`${match.url}/verify-email/:verificationId/:token`}
          render={props => <VerifyEmail {...props} />}
        />
        <Redirect to={'/error'} />
      </Switch>
    </AuthLayout>
  )
}

export default ViewAuth
