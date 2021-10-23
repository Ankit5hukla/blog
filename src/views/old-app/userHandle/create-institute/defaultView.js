import React from 'react'
import { Link } from 'react-router-dom'

import Institute from './Institute'

const Institutes = ({
  match: {
    params: { userHandle },
  },
}) => {
  false && console.log(userHandle)
  return (
    <div>
      <Link className={'btn btn-app me-3 mb-3'} to={`/app/${userHandle}`}>
        Back
      </Link>
      <Institute userHandle={userHandle} />
    </div>
  )
}

export default Institutes
