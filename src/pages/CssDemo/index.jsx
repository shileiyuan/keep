import React from 'react'
import SubLayout from '@/components/SubLayout'
import LayoutDemo from './LayoutDemo'
import LineHeightDemo from './LineHeightDemo'
import TableDemo from './TableDemo'
import BgBorderDemo from './BgBorderDemo'

const DEFAULT_PATH = 'BgBorderDemo'

const routes = [
  {
    path: '/CssDemo',
    routes: [
      { path: 'LayoutDemo', component: LayoutDemo },
      { path: 'LineHeightDemo', component: LineHeightDemo },
      { path: 'TableDemo', component: TableDemo },
      { path: 'BgBorderDemo', component: BgBorderDemo }
    ],
    redirect: `/CssDemo/${DEFAULT_PATH}`
  }
]

export default function Demo() {
  return (
    <SubLayout routes={routes} />
  )
}
