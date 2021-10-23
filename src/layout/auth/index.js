import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Footer from './footer'

const AuthLayout = ({ children }) => {
  return (
    <main className={'user-authorize'}>
      <Header />
      <section className={'auth-box'}>{children}</section>
      <Footer />
    </main>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthLayout
