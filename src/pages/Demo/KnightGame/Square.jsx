import React from 'react'
import { useDrop } from 'react-dnd'
import Knight from './Knight'
import { DND_TYPES } from '@/libs/config'
import { canMoveKnight } from './logic'

export default function Square(props) {
  const { index, knightPosition, setKnightPosition } = props
  const x = index % 8
  const y = Math.floor(index / 8)
  const [knightX, knightY] = knightPosition
  const isKnightHere = x === knightX && y === knightY
  const isBlack = (x + y) % 2 === 1

  const fill = isBlack ? 'black' : 'white'
  const stroke = isBlack ? 'white' : 'black'

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DND_TYPES.KNIGHT,
    drop: (item) => {
      setKnightPosition([x, y])
    },
    canDrop: () => canMoveKnight(knightPosition, [x, y]),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  return (
    <div
      ref={dropRef}
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '12.5%',
        height: '12.5%',
        position: 'relative'
      }}
    >
      {isKnightHere ? <Knight /> : null}
      {isOver && !canDrop && <Overlay color='red' />}
      {!isOver && canDrop && <Overlay color='yellow' />}
      {isOver && canDrop && <Overlay color='green' />}
    </div>
  )
}

function Overlay(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: props.color
      }}
    />
  )
}
