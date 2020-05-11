import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'
import Matrix from './Matrix'
import './detail.less'

const FormItem = Form.Item

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 }
}

const matrixLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 19 }
}

const tailLayout = {
  wrapperCol: { offset: 3, span: 3 }
}

export default function MatrixDetail() {
  const matrix = useSelector(state => state.matrix.matrix)
  const { name, code, description, columnList, rowList } = matrix
  const initialValues = {
    name,
    code,
    description,
    matrix: { columnList, rowList }
  }
  const matrixRef = React.createRef()

  const onFinish = useCallback(
    values => {
      matrixRef.current.validate()
      console.log(values)
    },
    [matrixRef]
  )
  return (
    <Form
      {...layout}
      className='matrix-form'
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <FormItem
        label='名称'
        name='name'
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label='编码'
        name='code'
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        {...matrixLayout}
        label='定义矩阵'
        name='matrix'
        required
      >
        <Matrix ref={matrixRef} />
      </FormItem>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          验证
        </Button>
      </Form.Item>
    </Form>
  )
}
