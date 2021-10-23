import React from 'react'

export const Icon = ({ icon, style, className }) => {
  return <i className={`lmsi icon-${icon} ${className}`} style={style} />
}

export const GoogleIcon = ({ icon = 'google', style, className }) => {
  return (
    <i className={`lmsi icon-${icon} ${className}`} style={style}>
      <i className={'path1'} />
      <i className={'path2'} />
      <i className={'path3'} />
      <i className={'path4'} />
    </i>
  )
}
