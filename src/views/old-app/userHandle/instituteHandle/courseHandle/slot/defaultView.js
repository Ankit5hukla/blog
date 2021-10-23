import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'src/AppContext'
import { isAuthorized } from 'src/helpers/Utils'
import { appRoot } from 'src/constants/defaultValues'

const CourseEdit = ({ match }) => {
  const {
    appStore: { user },
  } = useContext(AppContext)

  false && console.log(match)
  return (
    <div>
      <h1>Course Slot {match.params.slotId}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: `This page will be used for edit institute <strong>${match.params.instituteHandle}</strong> course <strong>${match.params.courseHandle}</strong>.`,
        }}
      />
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${match.params.userHandle}/${match.params.instituteHandle}/${match.params.courseHandle}/slots`}
      >
        Back
      </Link>
      {isAuthorized(user.role_id, 'instructor') && (
        <Link
          className={'btn btn-app me-3 mb-3'}
          to={`${appRoot}/${match.params.userHandle}/${match.params.instituteHandle}/${match.params.courseHandle}/edit-slot/${match.params.slotId}`}
        >
          Edit Slot
        </Link>
      )}
    </div>
  )
}

export default CourseEdit
