import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const Posts = React.lazy(() => import('./defaultView'))

const PostsView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Posts {...props} />
        }}
      />
      <Redirect to={'/error'} />
    </Switch>
  )
}

export default PostsView
