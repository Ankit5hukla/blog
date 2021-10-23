import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorized } from 'src/helpers/Utils'

const Institute = ({ match }) => {
  const {
    appStore: { user },
  } = useContext(AppContext)

  false && console.log(match)
  return (
    <div>
      <h1>Institute</h1>
      <p>
        This page will be used for displaying user institute
        {` ${match.params.instituteHandle}`}.
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/institutes`}
      >
        Back
      </Link>
      {isAuthorized(user.role_id, 'instructor') && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/edit`}>
          Edit Institute
        </Link>
      )}
      {isAuthorized(user.role_id, 'instructor') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/create-course`}
        >
          Create Course
        </Link>
      )}
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/courses`}>
        Courses
      </Link>
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/all-slots`}>
        All Slots
      </Link>
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/book-slot`}>
        Book Slot
      </Link>
      {isAuthorized(user.role_id, 'instructor') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/quick-slot`}
        >
          Create Quick Slot
        </Link>
      )}
    </div>
  )
}

export default Institute
