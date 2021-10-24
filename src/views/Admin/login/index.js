import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const SignIn = React.lazy(() => import('./defaultView'))

const ViewSignIn = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/:redirectTo?`}
        render={props => <SignIn {...props} />}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default ViewSignIn
