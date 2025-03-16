import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

// CSS for the spinner
const spinnerStyle = {
  border: '2px solid rgba(0, 0, 0, 0.1)',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  borderTopColor: 'rgba(4, 122, 14, 0.438)',
  animation: 'spin 1s ease-in-out infinite',
};

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Kindly fill out all fields.'));
      setShowModal(true);  // Show the modal when there's an error
      return;
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
        setShowModal(true);  // Show the modal when there's an error
        return;
      };

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
      setShowModal(true);  // Show the modal when there's an error
    }
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        // Optionally reset error if you also want it to disappear after 5 seconds
        // dispatch(updateFailure(null)); 
      }, 3000); // 3 seconds
  
      // Cleanup the timer if the component unmounts or the state changes before 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal]);

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
        <h1>Sign In</h1>
        <form className="input-fields" onSubmit={handleSubmit}>
          <div className="input-container">
            <h3>Your email</h3>
            <input 
              type="email" 
              id="email" 
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          <div className="input-container">
            <h3>Your password</h3>
            <div>
              <input 
                type={`${showPassword ? 'password' : 'text'}`} 
                name="" 
                id="password" 
                onChange={handleChange}
                autoComplete='off'
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEye />
                ): (
                  <FaEyeSlash />
                )}
              </span>
            </div>
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
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-container"
            >
              <motion.div
                initial={{ translateY: -400, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -400, opacity: 0 }}
                className="modal-box"
              >
                <FaTimes
                  className="close-modal"
                  onClick={() => setShowModal(false)}
                />
                <p className="modal-text">{errorMessage}</p>
                <motion.div className="actions">
                  <button type="button" onClick={() => setShowModal(false)}>OK</button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        }     
      </motion.div>
    </div>
  )
}

export default SignIn
