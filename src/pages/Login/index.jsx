import React from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import API from '@/libs/api'
import { AUTH_TOKEN_STORAGE_KEY } from '@/libs/config'
import './index.less'

const FormItem = Form.Item

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = async values => {
    const res = await API.post.login(values)
    if (res.success) {
      const { token, name, id } = res.data
      dispatch.login.saveInfo({
        isAuthed: true,
        userId: id,
        userName: name
      })
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
      history.push('/')
    }
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
