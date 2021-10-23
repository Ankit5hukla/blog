import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorizedByLevel } from 'src/helpers/Utils'

const CreateInstitute = React.lazy(() => import('./defaultView'))

const CreateInstituteView = ({ match }) => {
  const {
    appStore: { user },
  } = useContext(AppContext)
  false && console.log(match)

  return (
    <Switch>
      {!isAuthorizedByLevel(user.role_id, 'instructor') && (
        <Redirect exact from={`${match.url}/`} to={`/unauthorized`} />
      )}
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CreateInstitute {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default CreateInstituteView
