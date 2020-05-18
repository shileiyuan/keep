import React, { useCallback } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import './index.less'

export default function AvatarBtn() {
  const userName = useSelector(state => state.login.userName)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = useCallback(
    () => {
      dispatch.login.logout()
      history.push('/Login')
    },
    [dispatch.login, history]
  )
  const menu = (
    <Menu>
      <Menu.Item key='logout' onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className='user-info'>
        <Avatar size='large'>{userName}</Avatar>
        <DownOutlined />
      </div>
    </Dropdown>
  )
}
