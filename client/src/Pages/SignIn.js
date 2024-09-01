import React, { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'

// CSS for the spinner
const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  borderTopColor: 'rgba(4, 122, 14, 0.438)',
  animation: 'spin 1s ease-in-out infinite',
};

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage('Kindly fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      };
      setLoading(false);

      if (res.ok) {
        navigate('/');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='sign-up-container'>
      <div className="sign-up-box">
        <h1>Sign In</h1>
        <form className="input-fields" onSubmit={handleSubmit}>
          <div className="input-container">
            <h3>Your email</h3>
            <input type="email" name="" id="email" onChange={handleChange}/>
          </div>
          <div className="input-container">
            <h3>Your password</h3>
            <input type="password" name="" id="password" onChange={handleChange}/>
          </div>
          <button type="submit" disabled={loading}>
            {
              loading ? 
              (<>
                <div style={spinnerStyle}></div>
                <span>Loading...</span>
                </>
              )
              : 'Sign in'
            }
          </button>
        </form>
        <button type='button' className="google">
          <FcGoogle/>
          <p>Continue with Google</p>
        </button>
        <div className="sign-in">
          Don't have an account? 
          <Link to='/signup' >
            <span> Sign up</span>    
          </Link>
        </div>
        {errorMessage && 
        <p className="error">
          {errorMessage}
        </p>
        }
      </div>
    </div>
  )
}

export default SignIn
