import React from 'react'
import { NavLink } from 'react-router-dom'

import blockImage from 'src/assets/images/block.svg'

const ViewUnauthorized = () => {
  return (
    <div className={'container-fluid px-sm-0'}>
      <div className={'error-page'}>
        <h1 className={'display-1'}>Unauthorized</h1>
        <img
          src={blockImage}
          alt={'Something Went Wrong'}
          className={'mb-3 img-fluid'}
        />
        <h3 className={'fs-3'}>
          Sorry, You are not allowed to access that page.
        </h3>
        <NavLink className={'fs-4 text-decoration-none'} to={'/app'}>
          Start Over
        </NavLink>
      </div>
    </div>
  )
}

export default ViewUnauthorized
