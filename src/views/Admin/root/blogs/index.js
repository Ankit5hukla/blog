import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const AddBlogView = React.lazy(() => import('./add'))
const EditBlogView = React.lazy(() => import('./edit'))
const Blogs = React.lazy(() => import('./defaultView'))

const BlogsView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/add`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <AddBlogView {...props} />
        }}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <EditBlogView {...props} />
        }}
      />
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Blogs {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default BlogsView
