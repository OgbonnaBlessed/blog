import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import About from './Pages/About'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Projects' element={<Projects/>} />
          <Route path='/Sign-in' element={<SignIn/>} />
          <Route path='/Sign-up' element={<SignUp/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
