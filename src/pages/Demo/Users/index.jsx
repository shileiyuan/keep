import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

export default function Users(props) {
  const dispatch = useDispatch()
  const users = useSelector(state => state.demo.users)
  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name'
    },
    {
      key: 'password',
      dataIndex: 'password',
      title: 'Password'
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: 'Age'
    }
  ]
  useEffect(() => {
    dispatch.demo.queryUsers()
  }, [dispatch.demo])
  return (
    <div>
      <Table
        rowKey={record => record.id}
        columns={columns}
        pagination={false}
        dataSource={users}
      />
    </div>
  )
}
