import React from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import useSelector from '@/hooks/useShallowEqualSelector'
import './index.less'

export default function AvatarBtn() {
  const { userName, isAuthed } = useSelector('login', ['userName', 'isAuthed'])
  const dispatch = useDispatch()
  const history = useHistory()
  const menu = (
    <Menu>
      {
        isAuthed ? (
          <Menu.Item key='logout' onClick={() => { dispatch.login.logout() }}>
            Log out
          </Menu.Item>
        ) : (
          <Menu.Item key='login' onClick={() => { history.push('/Login') }}>
              Log in
          </Menu.Item>
        )
      }
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className='user-info'>
        <Avatar size='large'>{userName || '未登录'}</Avatar>
        <DownOutlined />
      </div>
    </Dropdown>
  )
}
