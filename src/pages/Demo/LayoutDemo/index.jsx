import React from 'react'
import Section from '@/components/CollapseSection'
import './index.less'

function getItems(count) {
  return [...Array(count)].map((_, index) => <div key={index} className='item'>{index + 1}</div>)
}

export default function LayoutDemo() {
  return (
    <div className='layout-demo'>

      <Section title='默认布局' boxClassName='box1'>
        {getItems(15)}
      </Section>

      <Section title='换行' boxClassName='box2'>
        {getItems(15)}
      </Section>

      <Section
        title='百分比布局'
        boxClassName='box3'
        footer='某个网格为固定的百分比，其余网格平均分配剩余空间'
      >
        <div>1/2</div>
        <div>auto</div>
        <div>auto</div>
      </Section>

    </div>
  )
}
