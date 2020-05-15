import React, { useState, useCallback } from 'react'
import { Typography, Button } from 'antd'
import useInterval from '@/hooks/useInterval2'

const { Title } = Typography

export default function Count() {
  const [count, setCount] = useState(0)

  // const callback = useCallback(
  //   () => {
  //     // setCount(count => count + 1)
  //     console.log(count)
  //     setCount(count + 1)
  //   },
  //   [count]
  // )

  const [step, setStep] = useState(1)

  // const callback = useCallback(
  //   () => {
  //     // console.log(count)
  //     setCount(count => count + step)
  //   },
  //   [step]
  // )

  const callback = () => {
    // setCount(count => count + step)
    setCount(count + step)
  }

  const [set, clear] = useInterval(() => {
    callback()
  }, 1000)

  const handleStartClick = useCallback(() => {
    // 先取消再设置，以防重复设置
    clear()
    set()
  }, [clear, set])

  return (
    <div>
      <Title level={4}>{count}</Title>
      <div>
        <Button
          type='primary'
          onClick={handleStartClick}
          style={{ marginRight: 8 }}
        >
          开始自增
        </Button>
        <Button onClick={clear}>取消</Button>
        <Button onClick={() => setStep(step + 1)}>step</Button>
      </div>

      <div style={{ marginTop: 20 }}>
        Hooks tony老师的方案: setCount时，获取不到闭包中的最新count值，必须要用传函数的方式
      </div>

    </div>
  )
}
