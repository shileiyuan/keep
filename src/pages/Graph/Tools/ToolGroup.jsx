import React, { useEffect } from 'react'
import { Tooltip } from 'antd'
import { noop } from '@/utils/common'
import keyEvent from '@/utils/keyEvent'

function Tool(props) {
  const { title, icon, onClick, codes } = props
  useEffect(() => {
    keyEvent.addEvent(codes, onClick)
    return () => {
      keyEvent.removeEvent(codes, onClick)
    }
  }, [codes, onClick])

  return (
    <Tooltip placement='bottom' title={title}>
      <span className='group-item' onClick={onClick}>
        {icon}
      </span>
    </Tooltip>
  )
}

Tool.defaultProps = {
  onClick: noop,
  title: '',
  icon: ''
}

export default function ToolGroup(props) {
  return (
    <span className='tool-group'>
      {props.items.map((item, index) => (
        <Tool key={index} {...item} />
      ))}
    </span>
  )
}
