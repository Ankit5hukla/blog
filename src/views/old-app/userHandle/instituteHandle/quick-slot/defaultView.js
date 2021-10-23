import React from 'react'
import { Link } from 'react-router-dom'

const QuickSlot = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Create Quick Slot</h1>
      <p>
        This page will be used for Create Quick Slot for the institute
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

export default QuickSlot
