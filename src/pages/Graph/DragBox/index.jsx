import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import cls from 'classnames'
import './index.less'

export default function DragBox() {
  const [visible, setVisible] = useState(false)

  return (
    <div className={cls('drag-box', { visible })}>
      <span onClick={() => setVisible(!visible)} className='drag-box-btn'>
        {visible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </span>
      <div className='drag-box-content'>
        content
      </div>
    </div>
  )
}
