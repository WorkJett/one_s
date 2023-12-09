import {createContext, useContext} from 'react'

export const TableProvider = ({children, table}) => {
  const value = {
    table
  }

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  )
}

const TableContext = createContext()
export const useTableContext = () => useContext(TableContext)
