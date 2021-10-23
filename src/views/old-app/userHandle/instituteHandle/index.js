import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const InstituteAllSlotsView = React.lazy(() => import('./all-slots'))
const InstituteBookSlotView = React.lazy(() => import('./book-slot'))
const InstituteCreateCourseView = React.lazy(() => import('./create-course'))
const CourseHandleView = React.lazy(() => import('./courseHandle'))
const InstituteCoursesView = React.lazy(() => import('./courses'))
const InstituteEditView = React.lazy(() => import('./edit'))
const InstituteQuickSlotView = React.lazy(() => import('./quick-slot'))
const InstituteHandle = React.lazy(() => import('./defaultView'))

const InstituteHandleView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/all-slots`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteAllSlotsView {...props} />
        }}
      />
      <Route
        path={`${match.url}/book-slot/:courseHandle?/:slotId?/:action?`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteBookSlotView {...props} />
        }}
      />
      <Route
        path={`${match.url}/create-course`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteCreateCourseView {...props} />
        }}
      />
      <Route
        path={`${match.url}/courses`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteCoursesView {...props} />
        }}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteEditView {...props} />
        }}
      />
      <Route
        path={`${match.url}/quick-slot`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteQuickSlotView {...props} />
        }}
      />
      <Route
        path={`${match.url}/:courseHandle`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CourseHandleView {...props} />
        }}
      />
      <Route
        exact={true}
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteHandle {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default InstituteHandleView
