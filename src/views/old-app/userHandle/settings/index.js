import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const Settings = React.lazy(() => import('./defaultView'))

const SettingsView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Settings {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default SettingsView
