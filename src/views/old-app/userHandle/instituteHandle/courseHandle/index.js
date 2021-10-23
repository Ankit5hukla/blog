import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const CoursesCreateSlotView = React.lazy(() => import('./create-slot'))
const CourseEditView = React.lazy(() => import('./edit'))
const CourseEditSlotView = React.lazy(() => import('./edit-slot'))
const CourseSlotView = React.lazy(() => import('./slot'))
const CourseSlotsView = React.lazy(() => import('./slots'))
const Courses = React.lazy(() => import('./defaultView'))

const InstituteCoursesView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/create-slot`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CoursesCreateSlotView {...props} />
        }}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CourseEditView {...props} />
        }}
      />
      <Route
        path={`${match.url}/edit-slot/:slotId`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CourseEditSlotView {...props} />
        }}
      />
      <Route
        path={`${match.url}/slot/:slotId`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CourseSlotView {...props} />
        }}
      />
      <Route
        path={`${match.url}/slots`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CourseSlotsView {...props} />
        }}
      />
      <Route
        exact={true}
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Courses {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default InstituteCoursesView
