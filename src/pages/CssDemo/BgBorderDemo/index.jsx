import React from 'react'
import './index.less'
import Section from '@/components/CollapseSection'

export default function BgBorderDemo() {
  return (
    <div className='bg-border-demo'>
      <Section title='test1' boxClassName='test1' defaultCollapse={false}>
        <div className='t1' />
      </Section>
    </div>
  )
}
