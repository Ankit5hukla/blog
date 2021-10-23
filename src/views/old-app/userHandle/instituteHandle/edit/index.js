import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const InstituteHandleEdit = React.lazy(() => import('./defaultView'))

const InstituteHandleEditView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteHandleEdit {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default InstituteHandleEditView
