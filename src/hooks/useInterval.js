import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current()
      }, delay)
      // the previous effect is cleaned up before executing the next effect.
      return () => clearInterval(id)
    }
  }, [delay])
}
