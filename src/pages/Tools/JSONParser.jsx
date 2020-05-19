import React, { useState, useCallback } from 'react'
import { Input, Button, Card, Modal, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

const { TextArea } = Input

export default function JSONParser() {
  const [input, setInput] = useState('{"name": "test"}')
  const [output, setOutput] = useState()
  const parse = useCallback(
    () => {
      try {
        const obj = JSON.parse(input)
        const result = JSON.stringify(obj, null, 2)
        setOutput(result)
      } catch (error) {
        Modal.error({ title: error.message })
      }
    },
    [input]
  )

  const copyContent = useCallback(
    async () => {
      const result = await navigator.permissions.query({ name: 'clipboard-write' })
      if (result.state === 'granted' || result.state === 'prompt') {
        try {
          navigator.clipboard.writeText(output)
          message.success('复制成功')
        } catch (error) {
          message.error('复制失败')
        }
      }
    },
    [output]
  )
  return (
    <div>
      <Button type='primary' onClick={parse}>转换</Button>
      <Card title='输入' style={{ marginTop: 20 }}>
        <TextArea onChange={e => setInput(e.target.value)} value={input} autoSize={{ minRows: 4 }} />
      </Card>
      <Card
        title='输出'
        style={{ marginTop: 20 }}
        extra={<CopyOutlined onClick={copyContent} />}
      >
        <TextArea value={output} autoSize={{ minRows: 4 }} />
      </Card>
    </div>
  )
}
