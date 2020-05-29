import React from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, Switch } from 'react-router-dom'
import AvatarBtn from '@/components/AvatarBtn'
import { formatRoutes, renderRoutes, renderMenus } from '@/utils/router'
import './index.less'

const { Header, Content } = Layout

export default function MainLayout(props) {
  const location = useLocation()
  const router = formatRoutes(props.routes)
  const match = location.pathname.match(/^(\/[^/]+)/)
  const selectedKeys = match ? [match[1]] : []
  return (
    <Layout className='main-layout'>
      <Header className='main-layout-header'>
        <div className='logo'>YSL</div>
        <Menu mode='horizontal' selectedKeys={selectedKeys}>
          {renderMenus(router)}
        </Menu>
        <AvatarBtn />
      </Header>
      <Content className='main-layout-content'>
        <Switch>
          {renderRoutes(router)}
        </Switch>
      </Content>
    </Layout>
  )
}
