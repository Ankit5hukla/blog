import { useCallback, useEffect, useRef, useState } from 'react'
import copy from 'copy-to-clipboard'

export const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

export const useStorage = (key, defaultValue, storageObject) => {
  const isMounted = useIsMounted(),
    [value, setValue] = useState(() => {
      const jsonValue = storageObject.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)

      if (typeof initialValue === 'function') {
        return defaultValue()
      } else {
        return defaultValue
      }
    })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    isMounted.current && setValue(undefined)
  }, [isMounted])

  return [value, setValue, remove]
}

export const useLocalStorage = (key, defaultValue) => {
  return useStorage(key, defaultValue, window.localStorage)
}

export const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])
  return isMounted
}

export const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [clear])
}

export const useToggle = defaultValue => {
  const [value, setValue] = useState(defaultValue),
    isMounted = useIsMounted(),
    toggleValue = value => {
      isMounted.current &&
        setValue(currentValue =>
          typeof value === 'boolean' ? value : !currentValue
        )
    }

  return [value, toggleValue]
}

export const useEventListener = (eventType, callback, element = window) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    const handler = e => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

export const useCopyToClipboard = () => {
  const [value, setValue] = useState()
  const [success, setSuccess] = useState()

  const copyToClipboard = (text, options) => {
    const result = copy(text, options)
    if (result) setValue(text)
    setSuccess(result)
  }

  return [copyToClipboard, { value, success }]
}
