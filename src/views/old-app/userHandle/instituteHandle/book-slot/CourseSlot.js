import React from 'react'
import { Link } from 'react-router-dom'

import { appRoot } from 'src/constants/defaultValues'

const CourseSlot = ({
  match,
  match: {
    params: { courseHandle, instituteHandle, userHandle },
  },
}) => {
  false && console.log(match)
  const generateSlotId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000)
      .toString()
      .padStart(10, '0')
  }

  return (
    <div>
      <h1>{`List slots of the course ${match.params.courseHandle}`}</h1>
      <p>
        {`This page will be used for List available slots of the course ${match.params.courseHandle} in the institute ${match.params.instituteHandle}.`}
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot`}
      >
        Back
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${userHandle}/${instituteHandle}/book-slot/${courseHandle}/${generateSlotId()}/book`}
      >
        7:30 AM - 8:30 AM
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${userHandle}/${instituteHandle}/book-slot/${courseHandle}/${generateSlotId()}/book`}
      >
        9:00 AM - 10:00 AM
      </Link>
    </div>
  )
}

export default CourseSlot
