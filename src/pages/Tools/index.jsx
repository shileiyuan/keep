import React from 'react'
import SubLayout from '@/components/SubLayout'
import JSONParser from './JSONParser'

const DEFAULT_PATH = 'JSONParser'

const routes = [
  {
    path: '/Tools',
    routes: [
      { path: 'JSONParser', component: JSONParser }
    ],
    redirect: `/Tools/${DEFAULT_PATH}`
  }
]

export default function Tools() {
  return (
    <SubLayout routes={routes} />
  )
}
