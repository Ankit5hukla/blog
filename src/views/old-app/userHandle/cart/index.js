import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const Cart = React.lazy(() => import('./defaultView'))

const CartView = ({ match }) => {
  false && console.log(match)

  return (
    <Switch>
      <Route
        path={`${match.url}/`}
        render={props => {
          props.match.params = { ...props.match.params, ...match.params }
          return <Cart {...props} />
        }}
      />
      <Redirect to={'/error'} message={'page not exist'} />
    </Switch>
  )
}

export default CartView
