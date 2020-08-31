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

      <Section
        title='flex圣杯布局'
        boxClassName='box4'
      >
        <header>header</header>
        <div className='box-body'>
          <main>main</main>
          <aside className='left'>leftleftleftleft</aside>
          <aside className='right'>
            <div>aaa</div>
          </aside>
        </div>
        <footer>footer</footer>
      </Section>

      <Section title='传统圣杯布局' boxClassName='box5'>
        <header>header</header>
        <div className='box-body'>
          <main>main</main>
          <aside className='left'>leftleftleftleft</aside>
          <aside className='right'>
            <div>aaa</div>
          </aside>
        </div>
        <footer>footer</footer>
      </Section>

      <Section title='改进版圣杯布局' boxClassName='box6'>
        <header>header</header>
        <div className='box-body'>
          <main>main</main>
          <aside className='left'>leftleftleftleft</aside>
          <aside className='right'>
            <div>aaa</div>
          </aside>
        </div>
        <footer>footer</footer>
      </Section>

      <Section title='双飞翼布局' boxClassName='box7'>
        <header>header</header>
        <div className='box-body'>
          <div className='main-wrapper'><main>main</main></div>
          <aside className='left'>leftleftleftleft</aside>
          <aside className='right'>
            <div>aaa</div>
          </aside>
        </div>
        <footer>footer</footer>
      </Section>

      <Section title='多行文本居中' boxClassName='mul-text'>
        <div>
          <span>
            background-color: @header-bg;
            height: @header-he
          </span>
        </div>
      </Section>

      <Section title='未知宽高的元素实现水平垂直居中：利用空元素或伪元素' boxClassName='hv1'>
        <div className='test'>
          水平垂直居中了吧<br />
          两行文字哦
        </div>
      </Section>

      <Section title='未知宽高的元素实现水平垂直居中：tansform加绝对定位' boxClassName='hv2' defaultCollapse={false}>
        <div className='test'>
          水平垂直居中了吧<br />
          两行文字哦
        </div>
      </Section>

    </div>
  )
}
