import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { canAccess } from 'src/helpers/Utils'

const Bookings = ({ match }) => {
  const {
      appStore: { user },
    } = useContext(AppContext),
    allowedAccess = canAccess(user, match.params.userHandle)

  false && console.log(match)
  return (
    <div>
      <h1>{`${allowedAccess ? 'My' : 'Users'} Bookings`}</h1>
      <p>This page will be used for displaying bookings.</p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default Bookings
