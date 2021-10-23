import React from 'react'

const Empty = ({ match }) => {
  false && console.log(match)
  return (
    <div>
      <h1>Empty</h1>
      <p>The is is empty Component for setting new route and page.</p>
    </div>
  )
}

export default Empty
