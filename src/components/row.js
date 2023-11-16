import {useOneSContext} from 'lib'
import {Cell} from 'components'

export const Row = ({row}) => {
  const {on_select_row} = useOneSContext()

  const {
    id,
    title,
    data
  } = row

  return (
    <tr>
      <th onClick={on_select_row(id)}>{title}</th>
      {data && data.length > 0 ? data.map(cell => (
        <Cell key={cell.id} cell={cell} />
      )) : null}
    </tr>
  )
}
