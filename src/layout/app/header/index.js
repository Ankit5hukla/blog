import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

import { AppContext } from 'src/AppContext'
import Logo from 'src/assets/svg/logo'

const Header = () => {
  const {
    appStore: { user },
  } = useContext(AppContext)

  return (
    <Navbar
      bg="white"
      expand={'lg'}
      className={'shadow-none border-bottom py-4'}
    >
      <div className={'container'}>
        <Link to={'/'} className={'left'}>
          <Logo />
        </Link>
        {user === null && (
          <div className={'right'}>
            <Link
              to={'/admin/sign-up'}
              className={'btn btn-lg btn-link text-decoration-none px-3'}
            >
              Sign Up
            </Link>
            <span className={'me-3'}>or</span>
            <Link
              to={'/admin/login'}
              className={'btn btn-lg btn-outline-app text-decoration-none px-5'}
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  )
}

export default Header
