import React, { useState, useRef, useEffect } from 'react'
import { Typography, Button, Switch } from 'antd'

const { Title } = Typography

export default function Count() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [delay, setDelay] = useState(1000)

  const savedCallback = useRef()
  savedCallback.current = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        savedCallback.current()
      }, delay)
      return () => clearInterval(id)
    }
  }, [delay, isRunning])

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
        <Button onClick={() => setDelay(delay / 2)}>加速</Button>
        <Button onClick={() => setDelay(delay * 2)}>减速</Button>
      </div>

      <div style={{ marginTop: 20 }}>
        Hooks 将回掉函数用ref保存
      </div>
    </div>
  )
}
