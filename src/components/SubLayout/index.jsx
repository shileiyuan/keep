import React from 'react'
import { Layout, Menu } from 'antd'
import { Switch, useLocation } from 'react-router-dom'
import { formatRoutes, renderRoutes, renderMenus } from '@/utils/router'

import './index.less'

const { Sider, Content } = Layout

export default function SubLayout(props) {
  const location = useLocation()
  const router = formatRoutes(props.routes)
  return (
    <Layout className='sub-layout'>
      <Sider className='sub-layout-sider'>
        <Menu mode='inline' selectedKeys={[location.pathname]}>
          {renderMenus(router)}
        </Menu>
      </Sider>
      <Content className='sub-layout-content'>
        <Switch>
          {renderRoutes(router)}
        </Switch>
      </Content>
    </Layout>
  )
}
