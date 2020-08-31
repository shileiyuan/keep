import React from 'react'
import Section from '@/components/CollapseSection'
import './index.less'

export default function LineHeightDemo(props) {
  return (
    <div className='line-height-demo'>

      <Section title='line-height的继承' boxClassName='box1'>
        <div>
          <p>This paragraph's 哈哈哈 中文 English</p>
        </div>
        <footer>
          line-height值从父元素继承时，要从父元素计算，除非父元素指定的是一个缩放因子，
          即数值时，子元素将继承这一数值来，从而根据自己的font-size计算line-height。
        </footer>
      </Section>

      <Section title='vertical-align' boxClassName='box2' defaultCollapse={false}>
        <p>
          We can either
          <span style={{ verticalAlign: '100%' }}>soar to new heights</span> or, instead,
          <span style={{ verticalAlign: '100%' }}>sink into despair...</span>
        </p>
        <p style={{ fontSize: '14px', lineHeight: '18px' }}>
          I felt that, if nothing else, I deserved a
          <span style={{ verticalAlign: '50%' }}>raise</span> for my efforts.
        </p>
        <footer>
          如果 vertical-align 设置一个百分数，会把元素的基线（或替换元素的底边） 相对于父元素的基线升高或降低指定的量
          （你指定的百分数要计算为该元素line-height的百分数，而不是相对于其父元素的line-height）。
          正百分数会使元素升高，负值则会使其降低。
        </footer>
      </Section>

      <Section title='word-space' boxClassName='box3'>
        word-space 用来增加字与字之间的标准间隔
      </Section>
    </div>
  )
}
