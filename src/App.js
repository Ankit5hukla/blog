import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SEO from 'react-helmet'

import { AppContext } from 'src/AppContext'
import AppLayout from 'src/layout/app'

// import { ProtectedRoute } from './helpers/authHelper'
// import { appRoot, UserRole } from 'src/constants/defaultValues'

// const ViewAuth = React.lazy(() => import('./views/auth'))

const ViewAdmin = React.lazy(() => import('./views/Admin'))

const PostView = React.lazy(() => import('./views/App/post'))

const PostsView = React.lazy(() => import('./views/App/posts'))

const ViewError = React.lazy(() => import('./views/Error'))

// const ViewUnauthorized = React.lazy(() => import('./views/Unauthorized'))

const App = () => {
  const {
    appStore: { pageTitle, siteName },
  } = useContext(AppContext)

  return (
    <AppLayout>
      <SEO title={pageTitle} titleTemplate={`%s - ${siteName}`} />
      <Switch>
        {/* <ProtectedRoute
        path={appRoot}
        component={ViewApp}
        roles={[
          UserRole.super_admin,
          UserRole.admin,
          UserRole.instructor,
          UserRole.learner,
        ]}
      />
      <Route path={'/auth'} render={props => <ViewAuth {...props} />} /> */}
        <Route path={'/admin'} render={props => <ViewAdmin {...props} />} />
        <Route path={'/error'} render={props => <ViewError {...props} />} />
        <Route path={`/:slug`} render={props => <PostView {...props} />} />
        <Route path={`/`} render={props => <PostsView {...props} />} />
        <Redirect to={'/error'} />
      </Switch>
    </AppLayout>
  )
}

export default App
