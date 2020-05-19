import React from 'react'
import Graph from './Graph'

const nodes = [
  {
    id: '1',
    shape: 'rect',
    width: 500,
    height: 500,
    x: 100,
    y: 100,
    shapeName: '1',
    children: [
      {
        id: '2',
        shape: 'rect',
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        shapeName: '2',
        style: {
          stroke: 'green',
          strokeWidth: '3'
        },
        children: [
          {
            id: '3',
            shape: 'rect',
            x: 20,
            y: 20,
            width: 100,
            height: 100,
            shapeName: '3',
            style: {
              fill: 'lightgreen',
              strokeWidth: '8',
              stroke: 'tomato'
            }
          }
        ]
      }
    ]
  },
  {
    id: '4',
    shape: 'rect',
    x: 700,
    y: 50,
    width: 150,
    height: 150,
    style: {
      stroke: 'black'
    }
    // shapeName: '4'
  },
  {
    id: '5',
    width: 233,
    height: 161,
    shape: 'rect',
    shapeName: '5',
    x: 700,
    y: 300,
    style: {
      stroke: 'red'
    },
    children: [
      {
        id: '6',
        width: 120,
        height: 72,
        name: '云',
        shape: 'cloud',
        shapeName: '云',
        type: 'box',
        x: 69,
        y: 38,
        style: {
          fill: 'yellow'
        }
      }
    ]
  }
]

const edges = [
  {
    id: 'edge-1',
    name: '关系名称',
    type: 'BROKEN',
    source: '4',
    sourceDirection: 'BOTTOM',
    target: '5',
    targetDirection: 'TOP'
  }
]

export default function GraphDemo() {
  return (
    <Graph nodes={nodes} edges={edges} />
  )
}
