import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorizedByLevel } from 'src/helpers/Utils'

const CreateUser = React.lazy(() => import('./defaultView'))

const CreateUserView = ({ match }) => {
  const {
    appStore: { user },
  } = useContext(AppContext)
  console.log(match, isAuthorizedByLevel(user.role_id, 'super_admin'))

  return (
    <Switch>
      {!isAuthorizedByLevel(user.role_id, 'super_admin') && (
        <Redirect exact from={`${match.url}/`} to={`/unauthorized`} />
      )}
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CreateUser {...props} />
        }}
      />
      <Redirect
        to={{
          pathname: '/error',
          state: { message: 'page not exist' },
        }}
      />
    </Switch>
  )
}

export default CreateUserView
