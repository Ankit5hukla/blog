import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const SetPassword = React.lazy(() => import('./defaultView'))

const ViewSetPassword = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/:token`}
        render={props => <SetPassword {...props} />}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default ViewSetPassword
