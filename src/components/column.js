import {useCallback, useState, useEffect} from 'react'

import {useTableContext} from 'lib'

export const Column = ({column}) => {
  const {table} = useTableContext()
  const [width, set_width] = useState(120)

  const {id, idx, title} = column

  useEffect(() => {
    column.get_resize_init = () => width 
  }, [width])

  useEffect(() => {
    column.set_width = set_width
  }, [])

  const on_hl_begin = useCallback(() => {
    table.hl_col_start(idx)
  }, [table, idx])

  const on_hl_move = useCallback(() => {
    table.set_hl_col(idx)
  }, [table, idx])

  const on_resize_begin = useCallback(e => {
    e.stopPropagation()
    table.resize_start(idx - 1, e.clientX, width)
  }, [table, idx, width])

  return (
    <th
      className="col"
      style={{width}}
      onMouseDown={on_hl_begin}
      onMouseMove={on_hl_move}
    >
      <span
        className="resize"
        onMouseDown={on_resize_begin}
      ></span>
      {title}
    </th>
  )
}
