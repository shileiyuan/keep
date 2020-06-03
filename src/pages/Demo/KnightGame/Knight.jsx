import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { DND_TYPES } from '@/libs/config'
import { knightImage } from './KnightDragImage'

export default function Knight() {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_TYPES.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <>
      <DragPreviewImage connect={preview} src={knightImage} />
      <div
        ref={drag}
        className='knight'
        style={{
          opacity: isDragging ? 0.5 : 1,
          border: isDragging ? '1px solid red' : 'none'
        }}
      >
        ♘
      </div>
    </>
  )
}
