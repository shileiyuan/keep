import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation, Switch } from 'react-router-dom'
import AvatarBtn from '@/components/AvatarBtn'
import { renderRoutes, formatRoutes } from '@/utils/router'
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
          {
            router.routes.filter(({ menu = true }) => menu).map(({ path }) => {
              const match = path.match(/\/([^/]+)$/)
              return (
                <Menu.Item key={path}>
                  <Link to={path}>{match ? match[1] : ''}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
        <AvatarBtn />
      </Header>
      <Content className='main-layout-content'>
        <Switch>
          {renderRoutes(props.routes)}
        </Switch>
      </Content>
    </Layout>
  )
}
