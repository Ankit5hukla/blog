import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const ForgotPassword = React.lazy(() => import('./defaultView'))

const ViewForgotPassword = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => <ForgotPassword {...props} />}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default ViewForgotPassword
