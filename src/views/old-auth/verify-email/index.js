import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const VerifyEmail = React.lazy(() => import('./defaultView'))

const VerifyEmailRoute = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => <VerifyEmail {...props} />}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default VerifyEmailRoute
