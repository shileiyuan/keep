import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import AvatarBtn from '@/components/AvatarBtn'
import './index.less'

const { Header, Content } = Layout

export default function MainLayout(props) {
  const location = useLocation()
  const items = [
    { to: '/Demo' },
    { to: '/Note' },
    { to: '/Gallery' }
  ]
  const match = location.pathname.match(/^(\/\w+)/)
  const selectedKeys = match ? [match[1]] : []
  return (
    <Layout className='main-layout'>
      <Header className='main-layout-header'>
        <div className='logo'>YSL</div>
        <Menu mode='horizontal' selectedKeys={selectedKeys}>
          {items.map(({ to }) => (
            <Menu.Item key={to}><Link to={to}>{to.slice(1)}</Link></Menu.Item>
          ))}
        </Menu>
        <AvatarBtn />
      </Header>
      <Content className='main-layout-content'>{props.children}</Content>
    </Layout>
  )
}
