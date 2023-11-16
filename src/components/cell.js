import {useOneSContext} from 'lib'

export const Cell = ({cell}) => {
  const {col, row} = useOneSContext()

  const {
    col_idx,
    row_idx,
    content
  } = cell

  const get_cls_by_header = () => {
    if (col_idx === col && row_idx === row) return 'active'
    if (col_idx === col || row_idx === row) return 'highlighted'
    return ''
  }

  const get_cls = () => {
    return `${get_cls_by_header()}`
  }

  return (
    <td className={get_cls()}>{content}</td>
  )
}
