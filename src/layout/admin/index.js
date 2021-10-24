import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'

const AdminLayout = ({ children }) => {
  return (
    <main className={'admin'}>
      <header>
        <Header />
      </header>
      <section className={'module'}>
        <div className={'container-fluid'}>{children}</div>
      </section>
    </main>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminLayout
