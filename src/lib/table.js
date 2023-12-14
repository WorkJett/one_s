const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const x_range = [...(new Array(100)).keys()]
const y_range = []

for (let i = 0; i < 100; i++) {
  const first_idx = Math.floor(i / alphabet.length)
  const second_idx = i % alphabet.length
  y_range.push(`${alphabet[first_idx]}${alphabet[second_idx]}`)
}

export default class Table {
  idx
  clear_other
  columns = []
  rows = []

  is_hl_col = false
  is_hl_row = false
  hl_col_begin
  hl_col_end
  hl_row_begin
  hl_row_end

  is_sel = false
  sel_col_begin
  sel_col_end
  sel_row_begin
  sel_row_end

  resize_col

  is_delimiter_hor = false
  delimiter_top
  delimiter_client_y
  is_delimiter_ver = false
  delimiter_left
  delimiter_client_x

  constructor(table_idx) {
    this.idx = table_idx
    this.on_delimiter_hor = () => {}
    this.on_delimiter_ver = () => {}
    this.on_delimiter_hor_end = () => {}
    this.on_delimiter_ver_end = () => {}
    this.columns = x_range.map((col_id, col_idx) => ({
      id: col_id,
      idx: col_idx,
      title: `Column #${col_id}`,
      set_width: () => {},
      get_resize_width: () => {}
    }))
    this.rows = y_range.map((row_id, row_idx) => ({
      id: row_id,
      idx: row_idx,
      title: `Row ${row_id}`,
      cells: x_range.map((col_id, col_idx) => ({
        id: `cell_${row_id}_${col_id}`,
        col_idx: col_idx,
        row_idx: row_idx,
        set_content: () => {},
        set_is_hl: () => {},
        set_is_sel_top: () => {},
        set_is_sel_right: () => {},
        set_is_sel_bottom: () => {},
        set_is_sel_left: () => {}
      }))
    }))
  }

  hl_col(begin, end, is_fill) {
    if (begin < end) {
      for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
        for (let col_idx = begin; col_idx < end; col_idx++) {
          this.rows[row_idx].cells[col_idx].set_is_hl(is_fill)
        }
      }
    }
    if (begin > end) {
      for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
        for (let col_idx = begin; col_idx > end; col_idx--) {
          this.rows[row_idx].cells[col_idx].set_is_hl(is_fill)
        }
      }
    }
  }

  hl_row(begin, end, is_fill) {
    if (begin < end) {
      for (let row_idx = begin; row_idx < end; row_idx++) {
        this.rows[row_idx].cells.forEach(cell => cell.set_is_hl(is_fill))
      }
    }
    if (begin > end) {
      for (let row_idx = begin; row_idx > end; row_idx--) {
        this.rows[row_idx].cells.forEach(cell => cell.set_is_hl(is_fill))
      }
    }
  }

  clear_hl_cols() {
    if (this.hl_col_begin == null || this.hl_col_end == null) return
    const col_first = Math.min(this.hl_col_begin, this.hl_col_end)
    const col_last = Math.max(this.hl_col_begin, this.hl_col_end)
    for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
      for (let col_idx = col_first; col_idx <= col_last; col_idx++) {
        this.rows[row_idx].cells[col_idx].set_is_hl(false)
      }
    }
    this.hl_col_begin = null
    this.hl_col_end = null
  }

  clear_hl_rows() {
    if (this.hl_row_begin == null || this.hl_row_end == null) return
    const row_first = Math.min(this.hl_row_begin, this.hl_row_end)
    const row_last = Math.max(this.hl_row_begin, this.hl_row_end)
    for (let row_idx = row_first; row_idx <= row_last; row_idx++) {
      this.rows[row_idx].cells.forEach(cell => cell.set_is_hl(false))
    }
    this.hl_row_begin = null
    this.hl_row_end = null
  }

  hl_col_start(idx) {
    if (this.clear_other) this.clear_other()
    this.clear_hl_rows()
    this.clear_sel()
    this.is_hl_col = true
    if (this.hl_col_begin == null) {
      this.hl_col_begin = idx
      this.hl_col_end = idx
      for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
        this.rows[row_idx].cells[idx].set_is_hl(true)
      }
      return
    }
    if (this.hl_col_begin === idx && this.hl_col_end === idx) {
      for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
        this.rows[row_idx].cells[idx].set_is_hl(false)
      }
      this.hl_col_finish()
      this.hl_col_begin = null
      this.hl_col_end = null
      return
    }
    this.clear_hl_cols()
    this.hl_col_begin = idx
    this.hl_col_end = idx
    for (let row_idx = 0; row_idx < this.rows.length; row_idx++) {
      this.rows[row_idx].cells[idx].set_is_hl(true)
    }
  }

  hl_col_finish() {
    this.is_hl_col = false
  }

  hl_row_start(idx) {
    if (this.clear_other) this.clear_other()
    this.clear_hl_cols()
    this.clear_sel()
    this.is_hl_row = true
    if (this.hl_row_begin == null) {
      this.hl_row_begin = idx
      this.hl_row_end = idx
      this.rows[idx].cells.forEach(cell => cell.set_is_hl(true))
      return
    }
    if (this.hl_row_begin === idx && this.hl_row_end === idx) {
      this.rows[idx].cells.forEach(cell => cell.set_is_hl(false))
      this.hl_row_finish()
      this.hl_row_begin = null
      this.hl_row_end = null
      return
    }
    this.clear_hl_rows()
    this.hl_row_begin = idx
    this.hl_row_end = idx
    this.rows[idx].cells.forEach(cell => cell.set_is_hl(true))
  }

  hl_row_finish() {
    this.is_hl_row = false
  }

  set_hl_col(idx) {
    if (!this.is_hl_col) return
    if (this.hl_col_begin == null || this.hl_col_end == null) return
   
    if (idx < this.hl_col_begin) {
      if (idx > this.hl_col_end) {
        this.hl_col(this.hl_col_end, idx, false)
      }
      if (idx < this.hl_col_end && this.hl_col_begin >= this.hl_col_end) {
        this.hl_col(idx, this.hl_col_end, true)
      }
      if (this.hl_col_begin < this.hl_col_end) {
        this.hl_col(this.hl_col_end, this.hl_col_begin, false)
        this.hl_col(idx, this.hl_col_begin, true)
      }
    }
    if (idx === this.hl_col_begin) {
      this.hl_col(this.hl_col_end, this.hl_col_begin, false)
    }
    if (idx > this.hl_col_begin) {
      if (idx < this.hl_col_end) {
        this.hl_col(this.hl_col_end, idx, false)
      }
      if (idx > this.hl_col_end && this.hl_col_end >= this.hl_col_begin) {
        this.hl_col(idx, this.hl_col_end, true)
      }
      if (this.hl_col_end < this.hl_col_begin) {
        this.hl_col(this.hl_col_end, this.hl_col_begin, false)
        this.hl_col(idx, this.hl_col_begin, true)
      }
    }

    this.hl_col_end = idx
  }

  set_hl_row(idx) {
    if (!this.is_hl_row) return
    if (this.hl_row_begin == null || this.hl_row_end == null) return
   
    if (idx < this.hl_row_begin) {
      if (idx > this.hl_row_end) {
        this.hl_row(this.hl_row_end, idx, false)
      }
      if (idx < this.hl_row_end && this.hl_row_begin >= this.hl_row_end) {
        this.hl_row(idx, this.hl_row_end, true)
      }
      if (this.hl_row_begin < this.hl_row_end) {
        this.hl_row(this.hl_row_end, this.hl_row_begin, false)
        this.hl_row(idx, this.hl_row_begin, true)
      }
    }
    if (idx === this.hl_row_begin) {
      this.hl_row(this.hl_row_end, this.hl_row_begin, false)
    }
    if (idx > this.hl_row_begin) {
      if (idx < this.hl_row_end) {
        this.hl_row(this.hl_row_end, idx, false)
      }
      if (idx > this.hl_row_end && this.hl_row_end >= this.hl_row_begin) {
        this.hl_row(idx, this.hl_row_end, true)
      }
      if (this.hl_row_end < this.hl_row_begin) {
        this.hl_row(this.hl_row_end, this.hl_row_begin, false)
        this.hl_row(idx, this.hl_row_begin, true)
      }
    }

    this.hl_row_end = idx
  }

  sel_rect(col_begin, col_end, row_begin, row_end, is_draw) {
    const
      row_first = Math.min(row_begin, row_end),
      row_last = Math.max(row_begin, row_end),
      col_first = Math.min(col_begin, col_end),
      col_last = Math.max(col_begin, col_end)
    if (row_first === 0) {
      for (let col_idx = col_first; col_idx <= col_last; col_idx++) {
        this.rows[row_first].cells[col_idx].set_is_sel_top(is_draw)
      }
    } else {
      for (let col_idx = col_first; col_idx <= col_last; col_idx++) {
        this.rows[row_first-1].cells[col_idx].set_is_sel_bottom(is_draw)
      }
    }
    for (let row_idx = row_first; row_idx <= row_last; row_idx++) {
      this.rows[row_idx].cells[col_last].set_is_sel_right(is_draw)
    }
    for (let col_idx = col_first; col_idx <= col_last; col_idx++) {
      this.rows[row_last].cells[col_idx].set_is_sel_bottom(is_draw)
    }
    if (col_first === 0) {
      for (let row_idx = row_first; row_idx <= row_last; row_idx++) {
        this.rows[row_idx].cells[col_first].set_is_sel_left(is_draw)
      }
    } else {
      for (let row_idx = row_first; row_idx <= row_last; row_idx++) {
        this.rows[row_idx].cells[col_first-1].set_is_sel_right(is_draw)
      }
    }
  }

  clear_sel() {
    if (this.sel_col_begin == null || this.sel_col_end == null ||
        this.sel_row_begin == null || this.sel_row_end == null) return

    this.sel_rect(this.sel_col_begin, this.sel_col_end, this.sel_row_begin, this.sel_row_end, false)

    this.sel_col_begin = null
    this.sel_col_end = null
    this.sel_row_begin = null
    this.sel_row_end = null
  }

  sel_start(col_idx, row_idx) {
    if (this.clear_other) this.clear_other()
    this.clear_hl_cols()
    this.clear_hl_rows()
    this.clear_sel()

    this.is_sel = true

    this.sel_col_begin = col_idx
    this.sel_col_end = col_idx
    this.sel_row_begin = row_idx
    this.sel_row_end = row_idx

    this.sel_rect(this.sel_col_begin, col_idx, this.sel_row_begin, row_idx, true)
  }

  sel_finish() {
    this.is_sel = false
  }

  set_sel(col_idx, row_idx) {
    if (!this.is_sel) return
    if (this.sel_col_begin == null || this.sel_col_end == null) return
    if (this.sel_row_begin == null || this.sel_row_end == null) return

    this.sel_rect(this.sel_col_begin, this.sel_col_end, this.sel_row_begin, this.sel_row_end, false)
    this.sel_rect(this.sel_col_begin, col_idx, this.sel_row_begin, row_idx, true)

    this.sel_row_end = row_idx
    this.sel_col_end = col_idx
  }

  resize_start(col_idx, begin_pos) {
    const width = this.columns[col_idx].get_resize_init()
    this.resize_col = {col_idx, begin_pos, width}
  }

  resize_finish() {
    this.resize_col = null
  }

  resize(x_pos) {
    if (this.resize_col == null) return
    const delta = x_pos - this.resize_col.begin_pos
    if (this.resize_col.width + delta <= 120) return
    this.columns[this.resize_col.col_idx].set_width(this.resize_col.width + delta)
  }

  clear_all() {
    this.clear_hl_cols()
    this.clear_hl_rows()
    this.clear_sel()
  }
}
