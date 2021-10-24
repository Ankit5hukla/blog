import React from 'react'

export const Button = ({
  type = 'button',
  className,
  variant = 'primary',
  ariaLabel,
  label = 'Click Me',
  disabled = false,
  title,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onKeyDown,
  style,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}${className ? ` ${className}` : ``}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      style={style}
    >
      {children ? children : label}
    </button>
  )
}

export const OutlineButton = ({
  type = 'button',
  className,
  variant = 'primary',
  ariaLabel,
  label = 'Click Me',
  disabled = false,
  title,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
  onKeyDown,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-outline-${variant}${
        className ? ` ${className}` : ``
      }`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children ? children : label}
    </button>
  )
}
