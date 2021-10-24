import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'

const AppLayout = ({ children }) => {
  return (
    <div className={'app'}>
      <header>
        <Header />
      </header>
      <main className={'py-5'}>
        <div className={'container mt-5'}>{children}</div>
      </main>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
