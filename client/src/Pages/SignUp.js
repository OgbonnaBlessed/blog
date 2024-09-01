import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='sign-up-container'>
      <div className="sign-up-box">
        <h1>Sign up</h1>
        <div className="input-fields">
          <div className="input-container">
            <h3>Your username</h3>
            <input type="text" name="" id=""/>
          </div>
          <div className="input-container">
            <h3>Your email</h3>
            <input type="email" name="" id=""/>
          </div>
          <div className="input-container">
            <h3>Your password</h3>
            <input type="password" name="" id=""/>
          </div>
        </div>
        <button type="button">Sign up</button>
        <button className="google">
          <FcGoogle/>
          <p>Continue with Google</p>
        </button>
        <Link to='/Sign-in' className="sign-in">
          Have an account? <span>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
