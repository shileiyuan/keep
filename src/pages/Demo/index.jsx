import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import Theme from './Theme'
import Users from './Users'

import './index.less'

const { Sider, Content } = Layout

const menus = [
  { key: 'Users', Component: Users },
  { key: 'Theme', Component: Theme }
]

const DEFAULT_PATH = 'Users'

export default function Demo() {
  const { path } = useRouteMatch()
  const location = useLocation()
  const getPath = comPath => `${path}/${comPath}`
  const match = location.pathname.match(/^\/\w+\/(\w+)/)
  const selectedKeys = match ? [match[1]] : []
  return (
    <Layout className='demo'>
      <Sider className='demo-sider'>
        <Menu mode='inline' selectedKeys={selectedKeys}>
          {menus.map(menu => {
            const { key } = menu
            return (
              <Menu.Item key={key}>
                <Link to={getPath(key)}>{key}</Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Content className='demo-content'>
        <Switch>
          <Redirect from={path} to={getPath(DEFAULT_PATH)} exact />
          {menus.map(menu => {
            const { key, Component } = menu
            return <Route path={getPath(key)} key={key}><Component /></Route>
          })}
        </Switch>
      </Content>
    </Layout>
  )
}
