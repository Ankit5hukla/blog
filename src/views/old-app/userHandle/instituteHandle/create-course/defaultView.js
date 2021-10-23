import React from 'react'
import { Link } from 'react-router-dom'

const CreateCourse = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Institute Create Course</h1>
      <p>
        This page will be used for Create Course in the institute
        {` ${match.params.instituteHandle}`}.
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default CreateCourse
