import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Checkout</h1>
      <p>This page will be used for slots checkout.</p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default Checkout
