import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const AvailableCourses = React.lazy(() => import('./defaultView'))
const BookSlot = React.lazy(() => import('./BookSlot'))
const CourseSlot = React.lazy(() => import('./CourseSlot'))
const EditSlot = React.lazy(() => import('./EditSlot'))

const InstituteBookSlotView = ({
  match: {
    url,
    params,
    params: { action, courseHandle, slotId },
  },
}) => {
  !false && console.log(params)

  return (
    <Switch>
      {courseHandle && slotId && action && action === 'book' && (
        <Route
          path={`${url}/`}
          render={props => {
            props.match.params = { ...props.match.params, ...params }
            return <BookSlot {...props} />
          }}
        />
      )}
      {courseHandle && slotId && action && action === 'edit' && (
        <Route
          path={`${url}/`}
          render={props => {
            props.match.params = { ...props.match.params, ...params }
            return <EditSlot {...props} />
          }}
        />
      )}
      {courseHandle && (
        <Route
          path={`${url}/`}
          render={props => {
            props.match.params = { ...props.match.params, ...params }
            return <CourseSlot {...props} />
          }}
        />
      )}
      <Route
        path={`${url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...params }
          return <AvailableCourses {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default InstituteBookSlotView
