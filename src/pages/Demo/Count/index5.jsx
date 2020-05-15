import React, { useState } from 'react'
import { Typography, Button, Switch, InputNumber } from 'antd'
import useInterval from '@/hooks/useInterval'

const { Title } = Typography

export default function Count() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [delay, setDelay] = useState(1000)
  const [countMul, setCountMul] = useState(1)

  useInterval(() => {
    setCount(count + countMul)
  }, isRunning ? delay : null)

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
        <InputNumber min={1} max={5} step={1} onChange={setCountMul} value={countMul} />
      </div>
      <div style={{ marginTop: 20 }}>
        Hooks 完美方案，自己抽出一个useInterval
      </div>
    </div>
  )
}
