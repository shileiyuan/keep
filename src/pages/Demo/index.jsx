import React from 'react'
import SubLayout from '@/components/SubLayout'
import Theme from './Theme'
import Users from './Users'
import MatrixList from './MatrixList'
import MatrixDetail from './MatrixList/MatrixDetail'
import Count from './Count'
import KnightGame from './KnightGame'
import LayoutDemo from './LayoutDemo'

const DEFAULT_PATH = 'LayoutDemo'

const routes = [
  {
    path: '/Demo',
    routes: [
      { path: 'Users', component: Users, exact: true, needAuth: true },
      { path: 'Theme', component: Theme },
      { path: 'MatrixList', component: MatrixList, exact: true, needAuth: true },
      { path: 'MatrixList/MatrixDetail/:matrixId', component: MatrixDetail, exact: true, menu: false },
      { path: 'Count', component: Count },
      { path: 'KnightGame', component: KnightGame },
      { path: 'LayoutDemo', component: LayoutDemo }
    ],
    redirect: `/Demo/${DEFAULT_PATH}`
  }
]

export default function Demo() {
  return (
    <SubLayout routes={routes} />
  )
}
