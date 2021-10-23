import React from 'react'
import { NavLink } from 'react-router-dom'

import errorImage from 'src/assets/images/wrong-action.svg'
import { appRoot } from 'src/constants/defaultValues'

const Error = () => {
  return (
    <>
      <div className={'error-page'}>
        <h1 className={'display-1'}>Something Went Wrong</h1>
        <img
          src={errorImage}
          alt={'Something Went Wrong'}
          className={'img-fluid mb-3'}
        />
        <h3 className={'fs-3'}>Sorry, This page can not be displayed.</h3>
        <NavLink className={'fs-4 text-decoration-none'} to={appRoot}>
          Start Over
        </NavLink>
      </div>
    </>
  )
}

export default Error
