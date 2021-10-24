import * as AllActions from 'src/constants/actions'
import { decrypt } from 'src/helpers/Utils'
import { userStorageKey } from 'src/constants/defaultValues'

const AppReducer = (appStore, AppAction) => {
  switch (AppAction.type) {
    case AllActions.TITLE_UPDATE:
      return { ...appStore, pageTitle: AppAction.payload.pageTitle }
    case AllActions.LOAD_USER:
      return { ...appStore, user: AppAction.payload.user }
    case AllActions.LOGIN_USER:
      appStore.notifications.push(AppAction.payload.notification)
      appStore.user = decrypt(AppAction.payload.user)
      AppAction.payload.history &&
        AppAction.payload.history.push(AppAction.payload.redirectTo)
      return { ...appStore }
    case AllActions.LOGIN_FAILED:
      appStore.errors.push(AppAction.payload.error)
      return {
        ...appStore,
      }
    case AllActions.LOGOUT_USER:
      appStore.notifications.push(AppAction.payload.notification)
      AppAction.payload.history &&
        AppAction.payload.history.push(AppAction.payload.pathname)
      return {
        ...appStore,
        user: null,
      }
    case AllActions.DISMISS_ERROR:
      appStore.errors.splice(AppAction.payload.index, 1)
      return {
        ...appStore,
      }
    case AllActions.DISMISS_NOTIFICATION:
      appStore.notifications.splice(AppAction.payload.index, 1)
      return {
        ...appStore,
      }
    case AllActions.REGISTER_USER_SUCCESS:
      appStore.notifications.push(AppAction.payload.notification)
      AppAction.payload.history.push(`/admin/login`)
      return { ...appStore }
    case AllActions.REGISTER_USER_ERROR:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.REGISTER_USER_EXIST:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.PASSWORD_COPY_TO_CLIPBOARD:
      appStore.notifications.push(AppAction.payload.notification)
      return { ...appStore }
    case AllActions.FORGOT_PASSWORD_SUCCESS:
      appStore.notifications.push(AppAction.payload.notification)
      return { ...appStore }
    case AllActions.FORGOT_PASSWORD_ERROR:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.RESET_PASSWORD_SUCCESS:
      appStore.notifications.push(AppAction.payload.notification)
      AppAction.payload.history.replace(`/auth/sign-in`)
      return { ...appStore }
    case AllActions.RESET_PASSWORD_MISMATCH:
      appStore.notifications.push(AppAction.payload.notification)
      return { ...appStore }
    case AllActions.RESET_PASSWORD_ERROR:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.UNEXPECTED_ERROR:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.PROFILE_NAME_UPDATED:
      appStore.notifications.push(AppAction.payload.notification)
      appStore.user = decrypt(AppAction.payload.user)
      AppAction.payload.history &&
        AppAction.payload.history.push(AppAction.payload.redirectTo)
      return { ...appStore }
    case AllActions.PASSWORD_UPDATED:
      appStore.notifications.push(AppAction.payload.notification)
      return { ...appStore }
    case AllActions.PASSWORD_UPDATE_FAILED:
    case AllActions.PROFILE_UPDATE_FAILED:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.INSTITUTE_CREATED:
      appStore.notifications.push(AppAction.payload.notification)
      return { ...appStore }
    case AllActions.INSTITUTE_CREATION_FAILED:
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore }
    case AllActions.TOKEN_EXPIRED:
      AppAction.payload.history &&
        AppAction.payload.history.push('/admin/login')
      window.localStorage.removeItem(userStorageKey)
      appStore.errors.push(AppAction.payload.error)
      return { ...appStore, user: null }
    default:
      return appStore
  }
}

export default AppReducer
