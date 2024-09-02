import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
    const { theme } = useSelector(state => state.theme)

  return (
    <div className={`theme-container ${theme}`}>
        { children }
    </div>
  )
}

export default ThemeProvider
