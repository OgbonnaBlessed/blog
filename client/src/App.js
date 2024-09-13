import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import AnimatedRoutes from './Components/AnimatedRoutes'

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop/>
        <Header/>
        <AnimatedRoutes/>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
