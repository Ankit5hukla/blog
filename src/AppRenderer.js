import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import NotificationCenter from 'src/components/NotificationCenter'
import { AppStore } from 'src/AppContext'

const App = React.lazy(() => import('./App'))

const Main = () => {
  return (
    <AppStore>
      <Suspense fallback={<div className={'loading'} />}>
        <Router>
          <App />
        </Router>
      </Suspense>
      <NotificationCenter />
    </AppStore>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
