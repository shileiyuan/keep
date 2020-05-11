import React, { useState, useCallback, forwardRef, useImperativeHandle, useLayoutEffect } from 'react'
import R from 'ramda'
import { Table, Button, Form, Input } from 'antd'
import { PlusOutlined, CloseCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import uuid from '@/utils/uuid'
import { getDataSource, updateWhen, validateRules, getInitialValidateInfo } from './logic'

const FormItem = Form.Item

const TextArea = Input.TextArea

const TABLE_ID = 'matrix-talbe'

const CELL_WIDTH = 210
const OPERATE_WIDTH = 100

function Matrix(props, ref) {
  const [validateInfo, setValidateInfo] = useState(getInitialValidateInfo())
  const [tableWidth, setTableWidth] = useState(0)
  const { columnList = [], rowList = [] } = props.value

  const update = useCallback(
    data => {
      props.onChange({ ...props.value, ...data })
    },
    [props]
  )

  const validate = useCallback(
    () => {
      let validateInfo = getInitialValidateInfo()
      for (const rule of validateRules) {
        validateInfo = rule(columnList, rowList)
        if (validateInfo.validateStatus !== '') {
          break
        }
      }
      setValidateInfo(validateInfo)
      return validateInfo.validateStatus === ''
    },
    [columnList, rowList]
  )
  useImperativeHandle(ref, () => ({
    validate
  }))

  const getColumnValidateInfo = useCallback(
    columnId => {
      const { validateStatus, help, type, payload } = validateInfo
      const hit = type === 'column' && validateStatus !== '' && Array.isArray(payload) && payload.includes(columnId)
      return hit ? { validateStatus, help } : {}
    },
    [validateInfo]
  )

  const getCellValidateInfo = useCallback(
    (rowId, columnId) => {
      const { validateStatus, help, type, payload } = validateInfo
      const hit = type === 'row' && validateStatus !== '' && Array.isArray(payload[rowId]) && payload[rowId].includes(columnId)
      return hit ? { validateStatus, help } : {}
    },
    [validateInfo]
  )

  const handleColumnNameChange = useCallback(
    (e, columnId) => {
      const newColumnList = updateWhen(
        column => column.columnId === columnId,
        column => ({ ...column, columnName: e.target.value }),
        columnList
      )
      update({ columnList: newColumnList })
    },
    [columnList, update]
  )

  const handleCellChange = useCallback(
    (rowId, columnId, value) => {
      const newRowList = rowList.map(row => {
        if (row.rowId !== rowId) return row
        const columns = updateWhen(
          column => column.columnId === columnId,
          column => ({ ...column, valueList: value }),
          row.columns
        )
        return { ...row, columns }
      })
      update({ rowList: newRowList })
    },
    [rowList, update]
  )

  const addColumn = useCallback(
    () => {
      const columnId = uuid()
      const newColumnList = [
        ...columnList,
        { columnId, columnName: undefined }
      ]
      // 添加列时，每一行中的数据也要多加一列
      const newRowList = rowList.map(row => ({
        ...row,
        columns: [...row.columns, { columnId, valueList: [] }]
      }))
      update({ columnList: newColumnList, rowList: newRowList })
    },
    [columnList, rowList, update]
  )

  const copyRow = useCallback(
    columns => {
      const newRowList = [
        ...rowList,
        { rowId: uuid(), columns: R.clone(columns) }
      ]
      update({ rowList: newRowList })
    },
    [rowList, update]
  )

  const addRow = useCallback(
    () => {
      // 添加行时，行中的columnId要与columnList中的一致
      const columns = columnList.map(({ columnId }) => ({ columnId, valueList: [] }))
      copyRow(columns)
    },
    [columnList, copyRow]
  )

  const deleteRow = useCallback(
    rowId => {
      const newRowList = rowList.filter(row => rowId !== row.rowId)
      update({ rowList: newRowList })
    },
    [rowList, update]
  )

  const deleteColumn = useCallback(
    columnId => {
      const filterColumns = columns => columns.filter(column => column.columnId !== columnId)
      const newColumnList = filterColumns(columnList)
      // 删除列的时候，同步删除行中该列的数据
      const newRowList = rowList.map(row => ({ ...row, columns: filterColumns(row.columns) }))
      update({ columnList: newColumnList, rowList: newRowList })
    },
    [columnList, rowList, update]
  )

  useLayoutEffect(() => {
    const table = document.querySelector(`#${TABLE_ID}`)
    const rect = table ? table.getBoundingClientRect() : {}
    setTableWidth(rect.width || 0)
  }, [])

  const getColumns = useCallback(
    () => {
      const canDelRow = rowList.length > 1
      const columns = columnList.map(column => {
        const { columnId, columnName } = column
        const columnValidateInfo = getColumnValidateInfo(columnId)
        const title = (
          <span className='matrix-table-header-wrapper'>
            <FormItem style={{ marginBottom: 0 }} {...columnValidateInfo}>
              <Input
                value={columnName}
                onChange={e => handleColumnNameChange(e, columnId)}
                allowClear
                placeholder='请输入'
              />
            </FormItem>
            {columnList.length > 1 && <CloseCircleOutlined className='close-column' onClick={() => deleteColumn(columnId)} />}
          </span>
        )

        return {
          key: columnId,
          title,
          dataIndex: columnId,
          width: CELL_WIDTH,
          render: (_, record) => {
            const cellValidateInfo = getCellValidateInfo(record.rowId, columnId)
            const value = Array.isArray(record[columnId]) ? record[columnId].join('') : record[columnId]
            return (
              <FormItem style={{ marginBottom: 0 }} {...cellValidateInfo}>
                <TextArea
                  value={value}
                  onChange={e => handleCellChange(record.rowId, columnId, e.target.value)}
                />
              </FormItem>
            )
          }
        }
      })

      const scrollWidth = columnList.length * CELL_WIDTH + OPERATE_WIDTH
      const isScroll = scrollWidth > tableWidth

      columns.push({
        key: 'operation',
        dataIndex: 'operation',
        title: <div><Button icon={<PlusOutlined />} onClick={addColumn}>列</Button></div>,
        fixed: isScroll ? 'right' : false,
        width: OPERATE_WIDTH,
        render: (_, record) => (
          <div>
            <a style={{ marginRight: 8 }} onClick={() => copyRow(record.columns)}><CopyOutlined /></a>
            {canDelRow && <a onClick={() => deleteRow(record.rowId)}><DeleteOutlined /></a>}
          </div>
        )
      })

      return {
        columns,
        scroll: isScroll ? { x: scrollWidth } : undefined
      }
    },
    [addColumn, columnList, copyRow, deleteColumn, deleteRow, getCellValidateInfo, getColumnValidateInfo, handleCellChange, handleColumnNameChange, rowList.length, tableWidth]
  )
  const { columns, scroll } = getColumns()
  const dataSource = getDataSource(rowList)
  return (
    <>
      <Table
        id={TABLE_ID}
        rowKey={record => record.rowId}
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        scroll={scroll}
      />

      <footer style={{ marginTop: 5 }}>
        <Button style={{ marginRight: 15 }} onClick={addRow} icon={<PlusOutlined />}>行</Button>
      </footer>
    </>
  )
}

export default forwardRef(Matrix)
