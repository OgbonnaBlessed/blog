import React from 'react'
import About from '../Pages/About'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Dashboard from '../Pages/Dashboard'
import Home from '../Pages/Home'
import PrivateRoute from './PrivateRoute'
import OnlyAdminPrivateRoute from './OnlyAdminPrivateRoute'
import CreatePost from '../Pages/CreatePost'
import UpdatePost from '../Pages/UpdatePost'
import PostPage from '../Pages/PostPage'
import Search from '../Pages/Search'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Contact from '../Pages/Contact'

const AnimatedRoutes = () => {
    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>} />
            <Route path='/About' element={<About/>} />
            <Route path='/Contact' element={<Contact/>} />
            <Route path='/Post/:postSlug' element={<PostPage/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/search' element={<Search/>} />
            <Route element={<PrivateRoute/>}>
                <Route path='/Dashboard' element={<Dashboard/>} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-a-post' element={<CreatePost/>}/>
            <Route path='/update-post/:postId' element={<UpdatePost/>}/>
            </Route>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
