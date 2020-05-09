import React from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import './index.less'

const FormItem = Form.Item

function Login() {
  const dispatch = useDispatch()

  const onFinish = values => {
    dispatch.login.login(values)
  }

  return (
    <Form onFinish={onFinish} className='login-form' autoComplete='off'>
      <FormItem name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input prefix={<UserOutlined />} placeholder='Name' />
      </FormItem>

      <FormItem name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined />} type='password' placeholder='Password' />
      </FormItem>

      <Button type='primary' htmlType='submit' className='login-form-button'>
        Log in
      </Button>
    </Form>
  )
}

export default Login
