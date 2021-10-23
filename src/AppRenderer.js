import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
