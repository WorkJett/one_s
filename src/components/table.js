import {useCallback, useState, useEffect} from 'react'

import {
  useAppContext,
  MODE_SIN, MODE_HOR, MODE_VER,
  useTableContext
} from 'lib'
import {Column, Row} from 'components'

export const Table = () => {
  const {tables, mode, width, height} = useAppContext()
  const {table} = useTableContext()
  const {columns, rows} = table
  const [idx, set_idx] = useState()
  const [is_vis, set_is_vis] = useState(false)
  const [top, set_top] = useState(0)
  const [right, set_right] = useState(0)
  const [bottom, set_bottom] = useState(0)
  const [left, set_left] = useState(0)
  const [delimiter_top, set_delimiter_top] = useState(0)
  const [delimiter_left, set_delimiter_left] = useState(0)

  useEffect(() => {
    const idx = tables.indexOf(table)
    set_idx(idx)
  }, [tables, table])

  useEffect(() => {
    if (idx == null) return
    table.on_delimiter_hor = new_top => {
      if (idx === 1) set_delimiter_top(new_top - 8)
    }
    table.on_delimiter_ver = new_left => {
      if (idx === 1) set_delimiter_left(new_left - 8)
    }
    if (idx === 0) {
      table.on_delimiter_hor_end = new_bottom => {
        set_bottom(new_bottom)
      }
      table.on_delimiter_ver_end = new_right => {
        set_right(new_right)
      }
    }
    if (idx === 1) {
      table.on_delimiter_hor_end = new_top => {
        set_top(new_top)
        set_delimiter_top(new_top - 8)
      }
      table.on_delimiter_ver_end = new_left => {
        set_left(new_left)
        set_delimiter_left(new_left - 8)
      }
    }
  }, [idx, table])

  useEffect(() => {
    if (idx == null) return
    set_is_vis(mode != MODE_SIN || idx === 0)
    if (mode === MODE_SIN && idx === 0) {
      set_top(0)
      set_right(0)
      set_bottom(0)
      set_left(0)
    }
    if (mode === MODE_HOR && idx === 0) {
      set_top(0)
      set_right(0)
      set_left(0)
      set_bottom(height - Math.round((height - 8) / 2))
    }
    if (mode === MODE_HOR && idx === 1) {
      set_right(0)
      set_left(0)
      set_bottom(0)
      set_top(Math.round((height - 8) / 2) + 8)
      set_delimiter_top(Math.round((height - 8) / 2))
    }
    if (mode === MODE_VER && idx === 0) {
      set_top(0)
      set_left(0)
      set_bottom(0)
      set_right(width - Math.round((width - 8) / 2))
    }
    if (mode === MODE_VER && idx === 1) {
      set_top(0)
      set_right(0)
      set_bottom(0)
      set_left(Math.round((width - 8) / 2) + 8)
      set_delimiter_left(Math.round((width - 8) / 2))
    }
  }, [idx, mode])

  const on_end = useCallback(() => {
    table.hl_col_finish()
    table.hl_row_finish()
    table.sel_finish()
    table.resize_finish()
  }, [table])

  const on_move = useCallback(e => {
    table.resize(e.clientX)
  }, [table])

  const style = {
    display: is_vis ? 'block' : 'none',
    top,
    left,
    right,
    bottom
  }

  const delimiter_style = () => {
    if (mode === MODE_HOR) return ({
      height: 8,
      top: delimiter_top,
      left: 0,
      right: 0,
      cursor: 'row-resize'
    })
    if (mode === MODE_VER) return ({
      width: 8,
      top: 0,
      left: delimiter_left,
      bottom: 0,
      cursor: 'col-resize'
    })
  }

  const on_delimiter_begin = e => {
    if (idx != 1) return
    if (mode === MODE_HOR) {
      table.is_delimiter_hor = true
      table.delimiter_top = top
      table.delimiter_client_y = e.clientY
    }
    if (mode === MODE_VER) {
      table.is_delimiter_ver = true
      table.delimiter_left = left
      table.delimiter_client_x = e.clientX
    }
  }

  return (
    <>
      {idx === 1 && <div
        className="hor_delimiter"
        style={delimiter_style()}
        onMouseDown={on_delimiter_begin}
      ></div>}
      <div
        className="tableFixHead"
        style={style}>
        <table
          onMouseUp={on_end}
          onMouseLeave={on_end}
          onMouseMove={on_move}>
          <thead>
            <tr>
              <th className="col-first"></th>
              {columns.map(column => (
                <Column key={`col_${column.id}`} column={column} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <Row key={`row_${row.id}`} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
