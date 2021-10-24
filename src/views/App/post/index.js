import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import AppLayout from 'src/layout/app'
import { AppContext } from 'src/AppContext'

const Post = React.lazy(() => import('./defaultView'))

const PostView = ({ match }) => {
  const staleTime = 30000,
    fetchPost = ({ queryKey: slug }) =>
      axios.get(`${apiURL}/post/slug/${slug}`),
    {
      appStore: { apiURL },
    } = useContext(AppContext),
    { isLoading, data, isError } = useQuery(match.params.slug, fetchPost, {
      staleTime,
      refetchInterval: false,
      retry: false,
      select: data => data?.data,
    })

  if (isLoading) {
    return (
      <div
        className={'spinner-border spinner-border-sm text-light'}
        role={'status'}
      >
        <span className={'visually-hidden'}>Loading...</span>
      </div>
    )
  }

  if (isError) {
    return <Redirect exact from={`${match.url}/`} to={`/error`} />
  }

  return (
    <AppLayout>
      <Switch>
        <Route
          path={`${match.url}/`}
          render={props => {
            props.post = data
            props.match.params = { ...props.match.params, ...match.params }
            return <Post {...props} />
          }}
        />
        <Redirect to={'/error'} />
      </Switch>
    </AppLayout>
  )
}

export default PostView
