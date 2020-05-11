import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import Theme from './Theme'
import Users from './Users'
import MatrixList from './MatrixList'
import MatrixDetail from './MatrixList/MatrixDetail'

import './index.less'

const { Sider, Content } = Layout

const menus = [
  { key: 'Users', component: Users },
  { key: 'Theme', component: Theme },
  { key: 'MatrixList', component: MatrixList }
]

const DEFAULT_PATH = 'MatrixList'

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
            const { key, component } = menu
            return <Route path={getPath(key)} key={key} component={component} exact />
          })}
          <Route path='/Demo/MatrixList/MatrixDetail/:matrixId' component={MatrixDetail} exact />
        </Switch>
      </Content>
    </Layout>
  )
}
