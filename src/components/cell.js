import {useState, useEffect, useMemo} from 'react'

export const Cell = ({cell, sel_start, set_sel}) => {
  const [is_hl, set_is_hl] = useState(false)
  const [is_sel_top, set_is_sel_top] = useState(false)
  const [is_sel_left, set_is_sel_left] = useState(false)
  const [is_sel_right, set_is_sel_right] = useState(false)
  const [is_sel_bottom, set_is_sel_bottom] = useState(false)
  const [cls, set_cls] = useState()
  const {
    id,
    col_idx,
    row_idx,
    content
  } = cell

  useEffect(() => {
    cell.set_is_hl = set_is_hl
    cell.set_is_sel_right = set_is_sel_right
    cell.set_is_sel_bottom = set_is_sel_bottom
    cell.set_is_sel_top = set_is_sel_top
    cell.set_is_sel_left = set_is_sel_left
  }, [])

  useEffect(() => {
    let res = []
    if (is_hl) res.push('highlighted')
    if (is_sel_right) res.push('sel_right')
    if (is_sel_bottom) res.push('sel_bottom')
    if (is_sel_top) res.push('sel_top')
    if (is_sel_left) res.push('sel_left')
    set_cls(res.join(' '))
  }, [is_hl, is_sel_right, is_sel_bottom, is_sel_top, is_sel_left])

  const on_sel_begin = () => {
    sel_start(col_idx, row_idx)
  }

  const on_sel_move = () => {
    set_sel(col_idx, row_idx)
  }

  return (
    <td
      onMouseDown={on_sel_begin}
      onMouseMove={on_sel_move}
      className={cls}
    >{content}</td>
  )
}
