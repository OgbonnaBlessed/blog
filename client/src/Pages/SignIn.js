import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';

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
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Kindly fill out all fields.'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      };

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
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
        <OAuth/>
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
