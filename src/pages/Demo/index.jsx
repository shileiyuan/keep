import React from 'react'
import { Route } from 'react-router-dom'
import SubLayout from '@/components/SubLayout'
import Theme from './Theme'
import Users from './Users'
import MatrixList from './MatrixList'
import MatrixDetail from './MatrixList/MatrixDetail'
import Count from './Count'

const DEFAULT_PATH = 'Users'

const routes = [
  {
    path: '/Demo',
    routes: [
      { path: 'Users', component: Users, exact: true },
      { path: 'Theme', component: Theme },
      { path: 'MatrixList', component: MatrixList, exact: true },
      { path: 'MatrixList/MatrixDetail/:matrixId', component: MatrixDetail, exact: true, menu: false },
      { path: 'Count', component: Count }
    ],
    redirect: `/Demo/${DEFAULT_PATH}`
  }
]

export default function Demo() {
  return (
    <SubLayout routes={routes}>
      {/* <Route path='/Demo/MatrixList/MatrixDetail/:matrixId' component={MatrixDetail} exact /> */}
    </SubLayout>
  )
}
