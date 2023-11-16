import {
  useState,
  createContext,
  useContext
} from 'react'

export const OneSProvider = ({children}) => {
  const [col, set_col] = useState()
  const [row, set_row] = useState()

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

  const value = {
    col,
    row,
    on_select_column,
    on_select_row
  }

  return (
    <OneSContext.Provider value={value}>
      {children}
    </OneSContext.Provider>
  )
}

const OneSContext = createContext()
export const useOneSContext = () => useContext(OneSContext)
