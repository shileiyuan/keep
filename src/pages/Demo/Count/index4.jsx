import React, { useState, useCallback, useEffect } from 'react'
import { Typography, Button, Switch } from 'antd'
import useInterval from '@/hooks/useInterval2'

const { Title } = Typography

export default function Count() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [delay, setDelay] = useState(1000)

  const callback = useCallback(
    () => {
      // setCount(count => count + 1)
      console.log(count)
      setCount(count + 1)
    },
    [count]
  )

  const [set, clear] = useInterval(callback, delay)

  useEffect(() => {
    if (isRunning) {
      set()
      return () => clear()
    }
  }, [clear, isRunning, set])

  const increase = useCallback(
    () => {
      clear()
      setDelay(delay / 2)
      set()
    },
    [clear, delay, set]
  )

  const decrease = useCallback(
    () => {
      clear()
      setDelay(delay * 2)
      set()
    },
    [clear, delay, set]
  )

  return (
    <div>
      <Title level={4}>{count}</Title>
      <Title level={4}>{delay}</Title>

      <div>
        <Switch
          checkedChildren='开'
          unCheckedChildren='关'
          onChange={setIsRunning}
          checked={isRunning}
        />
        <Button onClick={increase}>加速</Button>
        <Button onClick={decrease}>减速</Button>
      </div>

      <div style={{ marginTop: 20 }}>
        Hooks tony老师的方案: setCount时，获取不到闭包中的最新count值，必须要用传函数的方式
      </div>

    </div>
  )
}
