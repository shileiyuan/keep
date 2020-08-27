import React, { useState } from 'react'
import cls from 'classnames'
import { DownOutlined } from '@ant-design/icons'
import './index.less'

export default function CollapseSection(props) {
  const { title, children, boxClassName, footer, defaultCollpase = false } = props
  const [collapse, setCollapse] = useState(defaultCollpase)
  console.log('collapse: ', collapse)
  return (
    <section className={cls('collapse-section', { 'cs-collapse': collapse })}>
      <h3>
        <span>{title}</span>
        <span className='es-collapse-icon' onClick={() => setCollapse(!collapse)}>
          <DownOutlined />
        </span>
      </h3>
      <main className={boxClassName}>{children}</main>
      <footer>{footer}</footer>
    </section>
  )
}
