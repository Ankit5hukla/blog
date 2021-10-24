import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'src/components/Buttons'
import { AppContext } from 'src/AppContext'

const Header = () => {
  const {
    appStore: { user, pageTitle },
  } = useContext(AppContext)

  return (
    <div className={'container-fluid'}>
      <div className={'card mt-4 p-3'}>
        <div className={'d-flex justify-content-between'}>
          <div className={'my-auto flex-grow-1'}>
            <h1 className={'page-title'}>{pageTitle}</h1>
            <p>
              Welcome <strong>{user?.user.name}</strong>{' '}
              <Button variant={'link'} className={'p-0 text-decoration-none'}>
                Logout
              </Button>
            </p>
          </div>
          <div className={'my-auto'}>
            <Link to={'/admin/add'} className={'btn btn-admin'}>
              Add Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
