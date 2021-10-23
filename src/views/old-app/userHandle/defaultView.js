import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorized, canAccess } from 'src/helpers/Utils'

const UserView = ({ match }) => {
  const {
      appStore: { user },
    } = useContext(AppContext),
    allowedAccess = canAccess(user, match.params.userHandle)

  false && console.log(match)

  return (
    <div>
      <h1>Display User Profile</h1>
      <p>This page will be used for displaying profile information.</p>
      {(allowedAccess || isAuthorized(user.role_id, 'super_admin')) && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/edit`}>
          Edit Profile
        </Link>
      )}
      {(allowedAccess || isAuthorized(user.role_id, 'admin')) && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/bookings`}>
          {`${allowedAccess ? 'My' : 'Users'} Bookings`}
        </Link>
      )}
      {allowedAccess && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/cart`}>
          Cart
        </Link>
      )}
      {allowedAccess && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/checkout`}>
          Checkout
        </Link>
      )}
      {isAuthorized(user.role_id, 'super_admin') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/create-user`}
        >
          Create New User
        </Link>
      )}
      {allowedAccess && isAuthorized(user.role_id, 'instructor') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/create-institute`}
        >
          Create Institutes
        </Link>
      )}
      {allowedAccess && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/institutes`}
        >
          Your Institutes
        </Link>
      )}
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/followers`}>
        Followers
      </Link>
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/following`}>
        Following
      </Link>
      {allowedAccess && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/settings`}>
          Settings
        </Link>
      )}
      <p>
        <strong>Name: </strong>
        {`${user.first_name} ${user.last_name}`}
      </p>
      {user.user_name && (
        <p>
          <strong>Username: </strong>
          {user.user_name}
        </p>
      )}
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
    </div>
  )
}

export default UserView
