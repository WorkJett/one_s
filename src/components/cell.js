import {useState, useEffect, useMemo, useRef} from 'react'

export const Cell = ({cell, sel_start, set_sel}) => {
  const [content, set_content] = useState()
  const [is_hl, set_is_hl] = useState(false)
  const [is_sel_top, set_is_sel_top] = useState(false)
  const [is_sel_left, set_is_sel_left] = useState(false)
  const [is_sel_right, set_is_sel_right] = useState(false)
  const [is_sel_bottom, set_is_sel_bottom] = useState(false)
  const [cls, set_cls] = useState()
  const editor_ref = useRef()
  const [is_edit, set_is_edit] = useState(false)
  const {
    id,
    col_idx,
    row_idx
  } = cell

  useEffect(() => {
    cell.set_is_hl = set_is_hl
    cell.set_is_sel_right = set_is_sel_right
    cell.set_is_sel_bottom = set_is_sel_bottom
    cell.set_is_sel_top = set_is_sel_top
    cell.set_is_sel_left = set_is_sel_left
    cell.set_content = set_content
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

  useEffect(() => {
    if (editor_ref && editor_ref.current &&
        content != null) {
      editor_ref.current.value = content
    }
  }, [editor_ref, is_edit])

  const on_sel_begin = () => {
    sel_start(col_idx, row_idx)
  }

  const on_sel_move = () => {
    set_sel(col_idx, row_idx)
  }

  const on_edit = e => {
    if (event.detail === 2) {
      set_is_edit(true)
    }
  }

  const on_exit_edit = e => {
    set_content(editor_ref.current.value)
    set_is_edit(false)
  }

  const on_save = e => {
    if (e.key === 'Enter') {
      editor_ref.current.blur()
    }
  }

  return (
    <td
      onMouseDown={on_sel_begin}
      onMouseMove={on_sel_move}
      onClick={on_edit}
      className={cls}
    >
      {is_edit ? (
        <input
          className="cell-editor"
          ref={editor_ref}
          autoFocus
          onBlur={on_exit_edit}
          onKeyDown={on_save}
        />
      ) : content}
    </td>
  )
}
