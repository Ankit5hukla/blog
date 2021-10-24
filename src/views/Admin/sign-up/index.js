import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const SignUp = React.lazy(() => import('./defaultView'))

const ViewSignUp = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/:signUpEmail?`}
        render={props => <SignUp {...props} />}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default ViewSignUp
