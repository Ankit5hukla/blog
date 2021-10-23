import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorized } from 'src/helpers/Utils'

const CreateCourse = ({ match }) => {
  const {
    appStore: { user },
  } = useContext(AppContext)

  false && console.log(match)
  return (
    <div>
      <h1>Institute Course</h1>
      <p>
        This page will be used for displaying Course
        {` ${match.params.courseHandle} `}
        in the institute {match.params.instituteHandle}.
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/courses`}
      >
        Back
      </Link>
      {isAuthorized(user.role_id, 'instructor') && (
        <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/edit`}>
          Edit Course
        </Link>
      )}
      {isAuthorized(user.role_id, 'instructor') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${match.url}/create-slot`}
        >
          Create Slot
        </Link>
      )}
      <Link className={'btn btn-app me-3 mb-3'} to={`${match.url}/slots`}>
        All Slots
      </Link>
    </div>
  )
}

export default CreateCourse
