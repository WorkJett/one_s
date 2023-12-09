import {useCallback, useMemo} from 'react'

import {useTableContext} from 'lib'
import {Cell} from 'components'

export const Row = ({row}) => {
  const {table} = useTableContext()

  const {
    id,
    idx,
    title,
    cells
  } = row

  const on_hl_begin = useCallback(() => {
    table.hl_row_start(idx)
  }, [table, idx])

  const on_hl_move = useCallback(() => {
    table.set_hl_row(idx)
  }, [table, idx])

  const sel_start = table.sel_start.bind(table)
  const set_sel = table.set_sel.bind(table)

  return (
    <tr>
      <th
        className="row"
        onMouseDown={on_hl_begin}
        onMouseMove={on_hl_move}
      >{title}</th>
      {cells.map(cell => (
        <Cell
          key={cell.id}
          cell={cell}
          sel_start={sel_start}
          set_sel={set_sel}
        />
      ))}
    </tr>
  )
}
