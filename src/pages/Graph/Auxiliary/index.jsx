import React from 'react'
import './index.less'

const list = [
  {
    key: 'resizeWrap',
    className: 'resize-rect',
    component: <path />
  },
  {
    key: 'newLine',
    className: 'new-line',
    component: <path stroke='#3cd768' fill='none' strokeWidth='2' />
  },
  {
    key: 'newDragLine',
    className: 'new-drag-line',
    component: <path strokeDasharray='5,5' stroke='#3cd768' fill='none' strokeWidth='2' />
  },
  {
    key: 'dragingNode',
    className: 'draging-node',
    component: <rect />
  }
]
// /ɔːg'zɪlɪərɪ/ 辅助的，补充的，备用的
function Auxiliary(props, ref) {
  return (
    <g ref={ref} className='auxiliary'>
      {
        list.map(item => {
          const { key, className, component } = item
          return React.cloneElement(component, {
            key,
            className,
            id: key
          })
        })
      }
    </g>
  )
}

export default React.forwardRef(Auxiliary)
