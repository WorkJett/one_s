import {useOneSContext} from 'lib'

export const Column = ({column}) => {
  const {on_select_column} = useOneSContext()

  const {id, title} = column

  return (
    <th onClick={on_select_column(id)}>{title}</th>
  )
}
