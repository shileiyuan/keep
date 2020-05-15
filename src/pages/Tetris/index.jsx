import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '@/hooks/useShallowEqualSelector'
import R from 'ramda'
import GameBoard from './GameBoard'
import InfoBoard from './InfoBoard'
import './index.less'
import {
  STATUS,
  checkCollisions,
  getCompletedLines,
  rotate
} from '@/pure/tetris'

export default function Tetris() {
  const ref = useRef({
    animateId: null,
    // 控制动画的开关
    animateCtrl: true,
    startMoveStraightDown: false
  })

  const animateCallback = useRef()

  const moveGraphDownRef = useRef()

  const dispatch = useDispatch()

  const { status, matrix, currentGraph, score, lines, nextGraph } =
    useShallowEqualSelector('tetris', ['status', 'matrix', 'currentGraph', 'score', 'lines', 'nextGraph'])

  const clearLineAnimate = useCallback(
    lines => {
      ref.current.animateCtrl = false
      setTimeout(() => {
        const newMatrix = matrix.map((line, index) => {
          if (!lines.includes(index)) return line
          return line.fill('#eee')
        })
        dispatch.tetris.clearLineAnimate(newMatrix)
        setTimeout(() => {
          dispatch.tetris.addScore(lines.length)
          dispatch.tetris.settleGraph(lines)
          ref.current.animateCtrl = true
        }, 500)
      }, 200)
    },
    [dispatch.tetris, matrix]
  )

  const moveGraph = useCallback(
    direction => {
      const collisionCheck = checkCollisions(direction, matrix, currentGraph)
      switch (direction) {
        case 'left': {
          if (collisionCheck === false) {
            dispatch.tetris.updateCurrentGraph(R.evolve({ offsetX: R.dec }, currentGraph))
          }
          break
        }
        case 'right': {
          if (collisionCheck === false) {
            dispatch.tetris.updateCurrentGraph(R.evolve({ offsetX: R.inc }, currentGraph))
          }
          break
        }
        case 'down': {
          if (collisionCheck === false) {
            dispatch.tetris.updateCurrentGraph(R.evolve({ offsetY: R.inc }, currentGraph))
          } else if (collisionCheck === 'GAME_OVER') {
            dispatch.tetris.setStatus(STATUS.over)
          } else {
            ref.current.startMoveStraightDown = false
            const lines = getCompletedLines(matrix, currentGraph)
            if (lines.length > 0) {
              clearLineAnimate(lines)
            } else {
              dispatch.tetris.addScore(lines.length)
              dispatch.tetris.settleGraph(lines)
            }
          }
          break
        }
      }
    },
    [clearLineAnimate, currentGraph, dispatch.tetris, matrix]
  )

  useEffect(() => {
    animateCallback.current = startTime => {
      const currentTime = Date.now()
      console.log('animate......')
      if (ref.current.animateCtrl && currentTime - startTime >= 600) {
        startTime = currentTime
        moveGraph('down')
      }
      ref.current.animateId = window.requestAnimationFrame(() => animateCallback.current(startTime))
    }
    moveGraphDownRef.current = () => {
      moveGraph('down')
    }
  }, [moveGraph])

  useEffect(() => {
    if (status === STATUS.playing) {
      ref.current.animateId = window.requestAnimationFrame(() => animateCallback.current(Date.now()))
      return () => {
        window.cancelAnimationFrame(ref.current.animateId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.animateId = null
      }
    }
  }, [status])

  const toggleStatus = useCallback(
    () => {
      if (status === STATUS.unload || status === STATUS.over) {
        dispatch.tetris.setStatus(STATUS.playing)
        dispatch.tetris.loadMatrix()
      } else if (status === STATUS.paused) {
        dispatch.tetris.setStatus(STATUS.playing)
      } else if (status === STATUS.playing) {
        dispatch.tetris.setStatus(STATUS.paused)
      }
    },
    [dispatch.tetris, status]
  )

  const moveStraightDown = useCallback(
    () => {
      if (!ref.current.startMoveStraightDown) return
      moveGraphDownRef.current()
      setTimeout(() => {
        moveStraightDown()
      }, 10)
    },
    []
  )

  const rotateGraph = useCallback(
    () => {
      const rotatedGraph = {
        ...currentGraph,
        graph: rotate(currentGraph.graph)
      }
      const collision = checkCollisions('rotate', matrix, rotatedGraph)
      if (collision === false) {
        dispatch.tetris.updateCurrentGraph(rotatedGraph)
      }
    },
    [currentGraph, dispatch.tetris, matrix]
  )

  const unload = useCallback(
    () => {
      dispatch.tetris.unload()
    },
    [dispatch.tetris]
  )

  const onKeydown = useCallback(
    e => {
      switch (e.key) {
        case 'a': // A 左
          e.preventDefault()
          moveGraph('left')
          break
        case 'd': // D 右
          e.preventDefault()
          moveGraph('right')
          break
        case 's': // S 下
          e.preventDefault()
          moveGraph('down')
          break
        case 'j': // J 旋转
          e.preventDefault()
          rotateGraph()
          break
        case 'k': // K 一键到底
          e.preventDefault()
          ref.current.startMoveStraightDown = true
          moveStraightDown()
          break
        case 'p':// P 暂停开始
        case ' ':
          e.preventDefault()
          toggleStatus()
          break
        case 'u': // unload
          e.preventDefault()
          unload()
          break
        default:
          break
      }
    },
    [moveGraph, moveStraightDown, rotateGraph, toggleStatus, unload]
  )
  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])
  return (
    <div className='tetris'>
      <GameBoard matrix={matrix} currentGraph={currentGraph} />
      <InfoBoard
        status={status}
        score={score}
        lines={lines}
        nextGraph={nextGraph}
        toggleStatus={toggleStatus}
      />
    </div>
  )
}
