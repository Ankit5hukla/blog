import React, { useEffect, useContext } from 'react'
import ReactHtmlParser from 'html-react-parser'

import { AppContext } from 'src/AppContext'
import { useToggle } from 'src/hooks'

import { DISMISS_ERROR, DISMISS_NOTIFICATION } from 'src/constants/actions'

export const Notification = ({
  index,
  error = undefined,
  notification = undefined,
}) => {
  const { updateAppStore } = useContext(AppContext),
    [showToast, toggleToast] = useToggle(true)
  useEffect(() => {
    setTimeout(() => {
      toggleToast()
      updateAppStore({
        type: error ? DISMISS_ERROR : DISMISS_NOTIFICATION,
        payload: {
          index,
        },
      })
    }, 5000)
  }, [error, index, toggleToast, updateAppStore])

  return (
    <div
      className={`toast align-items-center text-white bg-${
        error ? error.color : notification.color
      } border-0${showToast ? ` show` : ``}`}
      role={'alert'}
      aria-live={'assertive'}
      aria-atomic={'true'}
    >
      <div className={'d-flex'}>
        <div className={'toast-body my-auto flex-grow-1'}>
          {ReactHtmlParser(error ? error.message : notification.message)}
        </div>
        <button
          type={'button'}
          className={'btn-close btn-close-white me-2 my-auto'}
          data-bs-dismiss={'toast'}
          aria-label={'Close'}
          onClick={toggleToast}
        />
      </div>
    </div>
  )
}
