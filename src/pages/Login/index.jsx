import React, { forwardRef } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import './index.less'

const FormItem = Form.Item

function Login(props, ref) {
  const dispatch = useDispatch()

  const { getFieldDecorator, validateFields } = props.form

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) return
      dispatch.login.login(values)
    })
  }

  return (
    <Form onSubmit={handleSubmit} className='login-form' autoComplete='off'>
      <FormItem>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your name!' }]
        })(
          <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Name' />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
        )}
      </FormItem>
      <Button type='primary' htmlType='submit' className='login-form-button'>
        Log in
      </Button>
    </Form>
  )
}

export default Form.create()(forwardRef(Login))
