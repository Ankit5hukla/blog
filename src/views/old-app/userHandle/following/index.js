import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const Following = React.lazy(() => import('./defaultView'))

const FollowingView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Following {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default FollowingView
