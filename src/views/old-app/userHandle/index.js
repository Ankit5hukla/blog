import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const UserView = React.lazy(() => import('./defaultView'))
const BookingsView = React.lazy(() => import('./bookings'))
const CartView = React.lazy(() => import('./cart'))
const CheckoutView = React.lazy(() => import('./checkout'))
const CreateUserView = React.lazy(() => import('./create-user'))
const EditView = React.lazy(() => import('./edit'))
const FollowingView = React.lazy(() => import('./following'))
const FollowersView = React.lazy(() => import('./followers'))
const InstitutesView = React.lazy(() => import('./institutes'))
const SettingsView = React.lazy(() => import('./settings'))
const CreateInstituteView = React.lazy(() => import('./create-institute'))
const InstituteHandleView = React.lazy(() => import('./instituteHandle'))

const UserHandleView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/bookings`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <BookingsView {...props} />
        }}
      />
      <Route
        path={`${match.url}/cart`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CartView {...props} />
        }}
      />
      <Route
        path={`${match.url}/checkout`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CheckoutView {...props} />
        }}
      />
      <Route
        path={`${match.url}/create-user`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CreateUserView {...props} />
        }}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <EditView {...props} />
        }}
      />
      <Route
        path={`${match.url}/followers`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <FollowersView {...props} />
        }}
      />
      <Route
        path={`${match.url}/following`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <FollowingView {...props} />
        }}
      />
      <Route
        path={`${match.url}/institutes`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstitutesView {...props} />
        }}
      />
      <Route
        path={`${match.url}/settings`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <SettingsView {...props} />
        }}
      />
      <Route
        path={`${match.url}/create-institute`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <CreateInstituteView {...props} />
        }}
      />
      <Route
        path={`${match.url}/:instituteHandle`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <InstituteHandleView {...props} />
        }}
      />
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <UserView {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default UserHandleView
