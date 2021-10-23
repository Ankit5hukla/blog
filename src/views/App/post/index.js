import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const Post = React.lazy(() => import('./defaultView'))

const PostView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Post {...props} />
        }}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default PostView
