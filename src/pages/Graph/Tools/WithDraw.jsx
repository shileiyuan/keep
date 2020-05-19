import React from 'react'
import { useDispatch } from 'react-redux'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'
import useSelector from '@/hooks/useShallowEqualSelector'
import ToolGroup from './ToolGroup'

export default function WithDraw(props) {
  const dispatch = useDispatch()
  const { undoCount, redoCount } = useSelector('graph', ['undoCount', 'redoCount'])
  const items = [
    {
      title: `撤回(ctrl+z) ${undoCount}`,
      icon: <UndoOutlined />,
      onClick: () => {
        dispatch.graph.undo()
      },
      codes: [['z', 'ctrlKey'], ['z', 'metaKey']]
    },
    {
      title: `重做(ctrl+r) ${redoCount}`,
      icon: <RedoOutlined />,
      onClick: () => {
        dispatch.graph.redo()
      },
      codes: [['r', 'ctrlKey']]
    }
  ]
  return <ToolGroup items={items} />
}
