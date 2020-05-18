import React from 'react'
import { Empty } from 'antd'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Empty>
      <Link to='/'>返回主页面</Link>
    </Empty>
  )
}
