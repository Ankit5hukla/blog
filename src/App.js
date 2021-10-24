import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SEO from 'react-helmet'

import { AppContext } from 'src/AppContext'

const ViewAdmin = React.lazy(() => import('./views/Admin'))

const PostView = React.lazy(() => import('./views/App/post'))

const PostsView = React.lazy(() => import('./views/App/posts'))

const ViewError = React.lazy(() => import('./views/Error'))

const App = () => {
  const {
    appStore: { pageTitle, siteName },
  } = useContext(AppContext)

  return (
    <>
      <SEO title={pageTitle} titleTemplate={`%s - ${siteName}`} />
      <Switch>
        <Route path={'/admin'} render={props => <ViewAdmin {...props} />} />
        <Route path={'/error'} render={props => <ViewError {...props} />} />
        <Route path={`/:slug`} render={props => <PostView {...props} />} />
        <Route path={`/`} render={props => <PostsView {...props} />} />
        <Redirect to={'/error'} />
      </Switch>
    </>
  )
}

export default App
