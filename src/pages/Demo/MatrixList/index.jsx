import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'

export default function MatrixList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch.matrix.queryMatrixList()
  }, [dispatch.matrix])

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      render(text, record) {
        return 'abc'
      }
    },
    {
      title: '编码',
      dataIndex: 'code'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '创建人',
      dataIndex: 'creator'
    },
    {
      title: '状态',
      dataIndex: 'status'
    }
  ]

  const matrixList = useSelector(state => state.matrix.matrixList)
  return (
    <div>
      <Table
        columns={columns}
        dataSource={matrixList}
        rowKey={record => record.id}
      />
    </div>
  )
}
