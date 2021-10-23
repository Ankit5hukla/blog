import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import { useToggle } from 'src/hooks'

export const Toast = ({ bgColor = 'primary', message }) => {
  const [showToast, toggleToast] = useToggle(true)
  return (
    <div
      className={`toast align-items-center text-white bg-${bgColor} border-0${
        showToast ? ` show` : ``
      }`}
      role={'alert'}
      aria-live={'assertive'}
      aria-atomic={'true'}
    >
      <div className={'d-flex'}>
        <div className={'toast-body my-auto flex-grow-1'}>
          {ReactHtmlParser(message)}
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
