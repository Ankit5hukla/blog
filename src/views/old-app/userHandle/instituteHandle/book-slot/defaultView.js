import React from 'react'
import { Link } from 'react-router-dom'

const AvailableCourses = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Institute Courses with Available Slots</h1>
      <p>
        This page will be used for List Courses with available slots in the
        institute{` ${match.params.instituteHandle}`}.
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}`}
      >
        Back
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/b-tech-2008-2012`}
      >
        B-Tech 2008-2012
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/m-tech-2008-2010`}
      >
        M-Tech 2008-2010
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/m-tech-2011-2012`}
      >
        M-Tech 2011-2012
      </Link>
    </div>
  )
}

export default AvailableCourses
