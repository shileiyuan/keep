import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'

export default function MatrixList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const matrixList = useSelector(state => state.matrix.matrixList)

  useEffect(() => {
    dispatch.matrix.queryMatrixList()
  }, [dispatch.matrix])

  const enterMatrixDetail = useCallback(
    record => {
      dispatch.matrix.enterMatrix(record.id)
      history.push(`${location.pathname}/MatrixDetail/${record.id}`)
    },
    [dispatch.matrix, history, location.pathname]
  )

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      render(text, record) {
        return <a onClick={() => enterMatrixDetail(record)}>{text}</a>
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
