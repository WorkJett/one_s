import {
  useState,
  createContext,
  useContext
} from 'react'

export const OneSProvider = ({children}) => {
  const [col, set_col] = useState()
  const [row, set_row] = useState()
  const [selected, set_selected] = useState([])

  const on_select_column = idx => () => {
    if (isNaN(col)) {
      set_col(idx)
    } else if (col === idx) {
      set_col()
    } else {
      set_col(idx)
    }
  }

  const on_select_row = idx => () => {
    if (!row) {
      set_row(idx)
    } else if (row === idx) {
      set_row()
    } else {
      set_row(idx)
    }
  }

  const on_select_cell = cell => () => {
    if (selected.includes(cell)) {
      set_selected([...selected.filter(each => each !== cell)])
    } else {
      set_selected([...selected, cell])
    }
  }

  const value = {
    col,
    row,
    selected,
    on_select_column,
    on_select_row,
    on_select_cell
  }

  return (
    <OneSContext.Provider value={value}>
      {children}
    </OneSContext.Provider>
  )
}

const OneSContext = createContext()
export const useOneSContext = () => useContext(OneSContext)
