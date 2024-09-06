import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import About from './Pages/About'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Projects' element={<Projects/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route element={<PrivateRoute/>}>
            <Route path='/Dashboard' element={<Dashboard/>} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-a-post' element={<CreatePost/>}/>
            <Route path='/update-post/:postId' element={<UpdatePost/>}/>
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
