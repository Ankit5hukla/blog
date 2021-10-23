import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'

import { AppContext } from 'src/AppContext'

const Post = React.lazy(() => import('./defaultView'))

const PostView = ({ match }) => {
  const staleTime = 30000,
    {
      appStore: { apiURL },
    } = useContext(AppContext),
    { isLoading, data, isError } = useQuery(
      match.params.slug,
      () => axios.get(`${apiURL}/post/slug/${match.params.slug}`),
      {
        staleTime,
        refetchInterval: false,
        retry: false,
        select: data => data?.data,
      }
    )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <Redirect exact from={`${match.url}/`} to={`/error`} />
  }

  return (
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
  )
}

export default PostView
