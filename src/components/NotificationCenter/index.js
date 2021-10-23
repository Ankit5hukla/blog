import React, { useContext } from 'react'

import { AppContext } from 'src/AppContext'
import { Notification } from './Notification'

const NotificationCenter = () => {
  const {
    appStore: { errors, notifications },
  } = useContext(AppContext)

  return (
    <div
      className={
        'toast-container position-fixed p-3 bottom-0 start-50 translate-middle-x'
      }
    >
      {errors.length > 0 &&
        errors
          .reverse()
          .map((error, index) => (
            <Notification key={index} index={index} error={error} />
          ))}
      {notifications.length > 0 &&
        notifications
          .reverse()
          .map((notification, index) => (
            <Notification
              key={index}
              index={index}
              notification={notification}
            />
          ))}
    </div>
  )
}

export default NotificationCenter
