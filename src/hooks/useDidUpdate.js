import { useEffect, useRef } from 'react'

export default function useDidUpdate(fn, deps = []) {
  const mountedRef = useRef(false)
  useEffect(
    () => {
      if (mountedRef.current) {
        fn()
      }
      if (!mountedRef.current) {
        mountedRef.current = true
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
}
