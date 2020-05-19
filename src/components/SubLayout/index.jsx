import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, Switch, useLocation } from 'react-router-dom'
import { renderRoutes, formatRoutes } from '@/utils/router'

import './index.less'

const { Sider, Content } = Layout

export default function SubLayout(props) {
  const location = useLocation()
  const router = formatRoutes(props.routes)
  return (
    <Layout className='sub-layout'>
      <Sider className='sub-layout-sider'>
        <Menu mode='inline' selectedKeys={[location.pathname]}>
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
      </Sider>
      <Content className='sub-layout-content'>
        <Switch>
          {renderRoutes(props.routes)}
        </Switch>
      </Content>
    </Layout>
  )
}
