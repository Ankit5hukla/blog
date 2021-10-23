import React from 'react'
import { Link } from 'react-router-dom'

const BookSlot = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Institute Book Slot {match.params.slotId}</h1>
      <p>
        {`This page will be used for booking slot ${match.params.slotId} of course ${match.params.courseHandle} with available slots in the institute ${match.params.instituteHandle} and Add to Cart.`}
      </p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/${match.params.courseHandle}`}
      >
        Back
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/${match.params.instituteHandle}/book-slot/${match.params.courseHandle}/${match.params.slotId}/edit`}
      >
        Edit
      </Link>
    </div>
  )
}

export default BookSlot
