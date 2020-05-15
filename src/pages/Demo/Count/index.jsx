import React from 'react'
import { Tabs } from 'antd'
import Count1 from './index1'
import Count2 from './index2'
import Count3 from './index3'
import Count4 from './index4'
import Count5 from './index5'
import Count6 from './index6'
import './index.less'

const { TabPane } = Tabs
const tabs = [
  Count1,
  Count2,
  Count3,
  Count4,
  Count5,
  Count6
]

export default function Count() {
  return (
    <Tabs className='count-tabs'>
      {
        tabs.map((Component, index) => {
          return (
            <TabPane key={index} tab={String(index + 1).repeat(3)}><Component /></TabPane>
          )
        })
      }
    </Tabs>
  )
}
