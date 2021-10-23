import React from 'react'
import { Link } from 'react-router-dom'

const Institutes = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>User Institutes</h1>
      <p>This page will be used for displaying user institutes.</p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}`}
      >
        Back
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/abcd`}
      >
        ABCD
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/wxyz`}
      >
        WXYZ
      </Link>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}/αβγδ`}
      >
        αβγδ
      </Link>
    </div>
  )
}

export default Institutes
