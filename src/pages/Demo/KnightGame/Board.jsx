import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Square from './Square'
import './index.less'

export default function Board() {
  const [knightPosition, setKnightPosition] = useState([0, 0])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='knight-board'>
        {
          Array.from(Array(64).keys()).map(i => (
            <Square
              key={i}
              index={i}
              knightPosition={knightPosition}
              setKnightPosition={setKnightPosition}
            />
          ))
        }
      </div>
    </DndProvider>

  )
}
