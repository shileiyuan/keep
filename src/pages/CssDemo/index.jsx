import React from 'react'
import SubLayout from '@/components/SubLayout'
import LayoutDemo from './LayoutDemo'
import LineHeightDemo from './LineHeightDemo'

const DEFAULT_PATH = 'LineHeightDemo'

const routes = [
  {
    path: '/CssDemo',
    routes: [
      { path: 'LayoutDemo', component: LayoutDemo },
      { path: 'LineHeightDemo', component: LineHeightDemo }
    ],
    redirect: `/CssDemo/${DEFAULT_PATH}`
  }
]

export default function Demo() {
  return (
    <SubLayout routes={routes} />
  )
}
