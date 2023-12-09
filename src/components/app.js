import {useState, useRef, useEffect} from 'react'
import Table from 'lib/table'
import {AppProvider, TableProvider} from 'lib'
import {Table as TableComponent} from 'components'

import {
  useAppContext,
  MODE_SIN, MODE_HOR, MODE_VER
} from 'lib'

const tables = []
const table1 = new Table(0)
const table2 = new Table(1)
tables.push(table1)
tables.push(table2)

export const App = () => {
  const app_ref = useRef()
  const [width, set_width] = useState()
  const [height, set_height] = useState()

  useEffect(() => {
    if (app_ref == null || app_ref.current == null) return
    const {width, height} = app_ref.current.getBoundingClientRect()
    set_width(width)
    set_height(height)
  }, [app_ref, app_ref.current])

  const on_move = e => {
    const {clientX, clientY} = e
    if (table2.is_delimiter_hor) {
      const new_top = clientY - table2.delimiter_client_y + table2.delimiter_top
      table1.on_delimiter_hor(new_top)
      table2.on_delimiter_hor(new_top)
    }
    if (table2.is_delimiter_ver) {
      const new_left = clientX - table2.delimiter_client_x + table2.delimiter_left
      table1.on_delimiter_ver(new_left)
      table2.on_delimiter_ver(new_left)
    }
  }

  const on_end = e => {
    const {clientX, clientY} = e
    if (table2.is_delimiter_hor) {
      const top = clientY - table2.delimiter_client_y + table2.delimiter_top
      table1.on_delimiter_hor_end(height - top + 8)
      table2.on_delimiter_hor_end(top)
    }
    if (table2.is_delimiter_ver) {
      const left = clientX - table2.delimiter_client_x + table2.delimiter_left
      table1.on_delimiter_ver_end(width - left + 8)
      table2.on_delimiter_ver_end(left)
    }
    table2.is_delimiter_ver = false
    table2.is_delimiter_hor = false
  }

  return (
    <div
      className="app"
      ref={app_ref}
      onMouseMove={on_move}
      onMouseUp={on_end}
    >
      <AppProvider tables={tables} width={width} height={height}>
        <TableProvider table={table1}>
          <TableComponent />
        </TableProvider>
        <TableProvider table={table2}>
          <TableComponent />
        </TableProvider>
      </AppProvider>
    </div>
  )
}
