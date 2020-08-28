import React, { useState } from 'react'
import cls from 'classnames'
import { DownOutlined } from '@ant-design/icons'
import './index.less'

export default function CollapseSection(props) {
  const { title, children, boxClassName, footer, defaultCollapse = true, className, style = {} } = props
  const [collapse, setCollapse] = useState(defaultCollapse)
  const wrapClassName = cls('collapse-section', { 'cs-collapse': collapse, [className]: className })
  const wrapBoxClassName = cls('section-body', { [boxClassName]: boxClassName })
  return (
    <section className={wrapClassName} style={style}>
      <h3 onClick={() => setCollapse(!collapse)}>
        <span>{title}</span>
        <span className='es-collapse-icon'>
          <DownOutlined />
        </span>
      </h3>
      <main className={wrapBoxClassName}>{children}</main>
      <footer>{footer}</footer>
    </section>
  )
}
