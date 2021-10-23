import React from 'react'
import { Link } from 'react-router-dom'

const Cart = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>User Cart</h1>
      <p>This page will be used for displaying Slots Cart.</p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default Cart
