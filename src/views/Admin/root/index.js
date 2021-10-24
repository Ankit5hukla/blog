import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from 'src/layout/admin'

const BlogsView = React.lazy(() => import('./blogs'))

const ViewAdmin = ({ match }) => {
  false && console.log(match)

  return (
    <AdminLayout>
      <Switch>
        <Route
          path={`${match.url}/`}
          render={props => {
            props.match.params = { ...props.match.params, ...match.params }
            return <BlogsView {...props} />
          }}
        />
        <Redirect to={'/error'} message={'page not exist'} />
      </Switch>
    </AdminLayout>
  )
}

export default ViewAdmin
