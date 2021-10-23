import { useCallback, useEffect, useRef, useState } from 'react'
import copy from 'copy-to-clipboard'

export const useArray = defaultValue => {
  const [array, setArray] = useState(defaultValue),
    push = element => {
      setArray(a => [...a, element])
    },
    replace = newValue => setArray(newValue),
    map = callback => setArray(a => [...a].map(callback)),
    filter = callback => {
      setArray(a => a.filter(callback))
    },
    sort = callback => setArray(a => [...a].sort(callback)),
    reverse = () => setArray(a => [...a].reverse()),
    update = (index, newElement) => {
      setArray(a => [
        ...a.slice(0, index),
        newElement,
        ...a.slice(index + 1, a.length - 1),
      ])
    },
    remove = index => {
      setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)])
    },
    clear = () => {
      setArray([])
    }

  return {
    array,
    setArray,
    push,
    replace,
    map,
    filter,
    sort,
    reverse,
    update,
    remove,
    clear,
  }
}

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)
    return asyncFunction()
      .then(response => {
        setValue(response)
        setStatus('success')
      })
      .catch(error => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return { execute, status, value, error }
}

export const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data)
          setError(null)
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error)
          setData(null)
        }
      })
      .finally(() => isMounted && setLoading(false))

    return () => (isMounted = false)
  }, [url, options])

  return { loading, error, data }
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

export const useSessionStorage = (key, defaultValue) => {
  return useStorage(key, defaultValue, window.sessionStorage)
}

export const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])
  return isMounted
}

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

export const useOnScreen = (ref, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (ref.current == null) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => {
      if (ref == null) return
      observer.unobserve(ref)
    }
  }, [ref, rootMargin])

  return isVisible
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEventListener('resize', () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  })

  return windowSize
}

export const useMediaQuery = mediaQuery => {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState(null)

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener('change', e => setIsMatch(e.matches), mediaQueryList)

  return isMatch
}

export const useGeolocation = options => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [data, setData] = useState({})

  useEffect(() => {
    const successHandler = e => {
      setLoading(false)
      setError(null)
      setData(e.coords)
    }
    const errorHandler = e => {
      setError(e)
      setLoading(false)
    }
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data }
}

export const useStateWithValidation = (validationFunc, initialValue) => {
  const [state, setState] = useState(initialValue)
  const [isValid, setIsValid] = useState(() => validationFunc(state))

  const onChange = useCallback(
    nextState => {
      const value =
        typeof nextState === 'function' ? nextState(state) : nextState
      setState(value)
      setIsValid(validationFunc(value))
    },
    [state, validationFunc]
  )

  return [state, onChange, isValid]
}

export const useSize = ref => {
  const [size, setSize] = useState({})

  useEffect(() => {
    if (ref.current == null) return
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return size
}

export const useEffectOnce = callback => {
  useEffect(callback)
}

export const useClickOutside = (ref, callback) => {
  useEventListener(
    'click',
    e => {
      if (ref.current == null || ref.current.contains(e.target)) return
      callback(e)
    },
    document
  )
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
