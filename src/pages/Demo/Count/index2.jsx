import React, { useState, useEffect } from 'react'
import { Typography, Button, Switch } from 'antd'

const { Title } = Typography

// 这个是直观感受，但是有问题
export default function Count() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [delay, setDelay] = useState(1000)

  // count 改一次就要重新set和clear一次，效率太低
  useEffect(() => {
    // the previous effect is cleaned up before executing the next effect.
    if (isRunning) {
      const id = setInterval(() => {
        setCount(count => count + 1)
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
        Hooks 直接写
      </div>
    </div>
  )
}
