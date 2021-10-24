import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const EditBlog = React.lazy(() => import('./defaultView'))

const EditBlogView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/:postId`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <EditBlog {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default EditBlogView
