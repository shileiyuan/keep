
// 马走日
export function canMoveKnight(knightPosition, toPosition) {
  const [x, y] = knightPosition
  const [toX, toY] = toPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}
