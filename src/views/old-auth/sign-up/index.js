import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const SignUp = React.lazy(() => import('./defaultView'))

const ViewSignUp = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/learner`} />
      <Route
        path={`${match.url}/:RoleKey/:Method?/:MethodValue?/:InstituteId?`}
        render={props => <SignUp {...props} />}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default ViewSignUp
