import React from 'react'
import './index.less'
import Section from '@/components/CollapseSection'

export default function TableDemo() {
  return (
    <div className='table-demo'>
      <Section title='table' boxClassName='t1' defaultCollapse={false}>
        <table>
          <tr><td>ab</td><td>cd</td></tr>
          <tr><td /><td>cd</td></tr>
        </table>
      </Section>
    </div>
  )
}
