import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { ProtectedRoute } from 'src/helpers/authHelper'

const ViewSignIn = React.lazy(() => import('./login'))
const ViewSignUp = React.lazy(() => import('./sign-up'))
const ViewAdmin = React.lazy(() => import('./root'))

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/login`}
        render={props => <ViewSignIn {...props} />}
      />
      <Route
        path={`${match.url}/sign-up`}
        render={props => <ViewSignUp {...props} />}
      />
      <ProtectedRoute path={`${match.url}/`} component={ViewAdmin} />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default Admin
