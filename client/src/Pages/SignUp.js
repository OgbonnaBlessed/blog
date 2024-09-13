import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth';
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';

// CSS for the spinner
const spinnerStyle = {
  border: '2px solid rgba(0, 0, 0, 0.1)',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  borderTopColor: '#444444',
  animation: 'spin 1s ease-in-out infinite',
};

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector(state => state.theme);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Kindly fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
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
        navigate('/signin');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setLoading(false);
        // Optionally reset error if you also want it to disappear after 5 seconds
        // dispatch(updateFailure(null)); 
      }, 2000); // 3 seconds
  
      // Cleanup the timer if the component unmounts or the state changes before 5 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className='sign-up-container'>
      <motion.div 
      initial={{
        opacity: 0,
        translateY: 200,
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      exit={{
        opacity: 0,
        translateY: 200
      }}
      className={`sign-up-box ${theme === 'light' ? 'dark-box-shadow' : 'light-box-shadow'}`}>
        <h1>Sign up</h1>
        <form className="input-fields" onSubmit={handleSubmit}>
          <div className="input-container">
            <h3>Your username</h3>
            <input type="text" name="" id="username"onChange={handleChange}/>
          </div>
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
              : 'Sign up'
            }
          </button>
        </form>
        <OAuth />
        <div className="sign-in">
          Have an account? 
          <Link to='/signin'>
          <span> Sign in</span>
          </Link>
        </div>
        {errorMessage && 
        <p className="error">
          {errorMessage === 'E11000 duplicate key error collection: Blog.users index: username_1 dup key: { username: "adminUser" }'
          ? 'user details already exist, kindly change your credentials' : errorMessage}
        </p>
        }
      </motion.div>
    </div>
  )
}

export default SignUp
