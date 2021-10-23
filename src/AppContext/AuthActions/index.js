import { useContext } from 'react'

import { AppContext } from 'src/AppContext'
import { isBrowser } from 'src/helpers/Utils'
import { LOGIN_USER } from 'src/constants/actions'

export const LoginUser = (user, history, redirectTo) => {
  const { updateAppStore } = useContext(AppContext)
  isBrowser && localStorage.setItem('app_user', JSON.stringify(user))
  updateAppStore({
    type: LOGIN_USER,
    payload: { user, history, redirectTo },
  })
}
