import React, { createContext, useEffect, useReducer, useRef } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { apiURL, appRoot, userStorageKey } from 'src/constants/defaultValues'
import { decrypt } from 'src/helpers/Utils'
import { useLocalStorage } from 'src/hooks'
import { LOAD_USER } from 'src/constants/actions'

import AppReducer from './AppReducer'

export const AppContext = createContext()

export const initialStoreState = {
  apiURL,
  appRoot,
  userStorageKey,
  pageTitle: 'Welcome',
  siteName: 'Blog Evolve',
  user: null,
  errors: [],
  notifications: [],
}
const queryClient = new QueryClient()

export const AppStore = ({ children }) => {
  const { Provider } = AppContext,
    [appStore, updateAppStore] = useReducer(AppReducer, initialStoreState),
    [appUser, setAppUser] = useLocalStorage(userStorageKey, null),
    isRemoved = useRef(false)

  useEffect(() => {
    const initializeUser = async () => {
      if (appUser) {
        try {
          if (!isRemoved.current) {
            updateAppStore({
              type: LOAD_USER,
              payload: { user: decrypt(appUser) },
            })
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    initializeUser()
  }, [appStore, appUser, setAppUser])

  useEffect(() => () => {
    isRemoved.current = true
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        value={{
          appStore,
          updateAppStore,
        }}
      >
        {children}
      </Provider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
