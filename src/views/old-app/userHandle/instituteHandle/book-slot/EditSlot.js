import React from 'react'
import { Link } from 'react-router-dom'

const EditSlot = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Institute Edit Slot {match.params.slotId} for booking</h1>
      <p>
        This page will be used for Edit Slot for booking of the institute
        {` ${match.params.instituteHandle}`} of course{' '}
        {match.params.courseHandle}.
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/${match.params.courseHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default EditSlot
