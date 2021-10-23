import React from 'react'
import { Link } from 'react-router-dom'

const Settings = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>User Settings</h1>
      <p>This page will be used for displaying user settings.</p>
      <Link
        className={'btn btn-app me-3 mb-3'}
        to={`/app/${match.params.userHandle}`}
      >
        Back
      </Link>
    </div>
  )
}

export default Settings
