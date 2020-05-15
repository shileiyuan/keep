import { useRef, useCallback, useMemo } from 'react'

export default function useInterval(fn, duration = 0) {
  const timerRef = useRef(0)
  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = 0
    }
  }, [])
  const set = useCallback(
    (...args) => {
      timerRef.current = setInterval(fn, duration, ...args)
      console.log('timerRef.current: ', timerRef.current)
    },
    [duration, fn]
  )
  const result = useMemo(() => {
    return [set, clear]
  }, [clear, set])
  return result
}
