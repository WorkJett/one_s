import {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react'

export const
  MODE_SIN = 'mode_sin',
  MODE_HOR = 'mode_hor',
  MODE_VER = 'mode_ver'

export const AppProvider = ({children, tables, width, height}) => {
  const [mode, set_mode] = useState(MODE_SIN)
  const [mid, set_mid] = useState(0)

  const value = {
    tables,
    mode, set_mode,
    width, height
  }

  if (width == null || height == null) return <></>

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)
