import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'antd'

export default function PrivateMenuItem(props) {
  const isAuthed = useSelector(state => state.login.isAuthed)
  if (!isAuthed) return null
  return <Menu.Item {...props}>{props.children}</Menu.Item>
}
