import React, { useCallback } from 'react'
import { Layer, Stage } from 'react-konva'
import { Button } from 'antd'
import Graph from './Graph'
import { STATUS } from '@/pure/tetris'

export default function InfoBorad(props) {
  const { nextGraph, status, score, lines, toggleStatus } = props
  const getStatusText = useCallback(
    () => {
      if (status === STATUS.paused) {
        return 'Start'
      } else if (status === STATUS.playing) {
        return 'Pause'
      } else if (status === STATUS.over) {
        return 'Restart'
      }
    },
    [status]
  )
  return (
    <div className='info-board'>
      <div className='control-btn-wrapper'>
        <Button onClick={toggleStatus}>{getStatusText(status)}</Button>
      </div>
      <h2>Next Shape</h2>
      <Stage width={200} height={100}>
        <Layer>
          <Graph {...nextGraph} />
        </Layer>
      </Stage>
      <div className='score'>
        <h2>Score</h2>
        <span>{score}</span>
        <h2>Lines</h2>
        <span>{lines}</span>
      </div>
    </div>
  )
}
