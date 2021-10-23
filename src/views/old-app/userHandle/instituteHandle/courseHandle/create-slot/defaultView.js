import React from 'react'
import { Link } from 'react-router-dom'

import { appRoot } from 'src/constants/defaultValues'

const CourseCreateSlot = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Create Course Slot</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: `This page will be used for creating a new course slot in institute <strong>${match.params.instituteHandle}</strong> for course <strong>${match.params.courseHandle}</strong>.`,
        }}
      />
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${match.params.userHandle}/${match.params.instituteHandle}/${match.params.courseHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default CourseCreateSlot
