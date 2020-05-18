import React from 'react'
import { Route } from 'react-router-dom'
import SubLayout from '@/components/SubLayout'
import Theme from './Theme'
import Users from './Users'
import MatrixList from './MatrixList'
import MatrixDetail from './MatrixList/MatrixDetail'
import Count from './Count'

import './index.less'

const DEFAULT_PATH = 'Users'

const routes = [
  {
    path: '/Demo',
    routes: [
      { path: 'Users', component: Users },
      { path: 'Theme', component: Theme },
      { path: 'MatrixList', component: MatrixList },
      { path: 'Count', component: Count }
    ],
    redirect: `/Demo/${DEFAULT_PATH}`
  }
]

export default function Demo() {
  return (
    <SubLayout routes={routes}>
      <Route path='/Demo/MatrixList/MatrixDetail/:matrixId' component={MatrixDetail} exact />
    </SubLayout>
  )
}
