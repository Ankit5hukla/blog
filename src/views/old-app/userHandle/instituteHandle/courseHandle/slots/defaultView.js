import React from 'react'
import { Link } from 'react-router-dom'

import { appRoot } from 'src/constants/defaultValues'

const CourseSlots = ({ match }) => {
  false && console.log(match)
  const generateSlotId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000)
      .toString()
      .padStart(10, '0')
  }
  return (
    <div>
      <h1>{match.params.courseHandle} All Slots</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: `This page will be used for displaying all slots in the institute <strong>${match.params.instituteHandle}</strong> course <strong>${match.params.courseHandle}</strong>.`,
        }}
      />
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${match.params.userHandle}/${match.params.instituteHandle}/${match.params.courseHandle}`}
      >
        Back
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${match.params.userHandle}/${
          match.params.instituteHandle
        }/${match.params.courseHandle}/slot/${generateSlotId()}`}
      >
        7:30 AM - 8:30 AM
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`${appRoot}/${match.params.userHandle}/${
          match.params.instituteHandle
        }/${match.params.courseHandle}/slot/${generateSlotId()}`}
      >
        9:00 AM - 10:00 AM
      </Link>
    </div>
  )
}

export default CourseSlots
