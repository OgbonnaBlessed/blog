import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account'})
        try {
          const resultsFromGoogle = await signInWithPopup(auth, provider);
          const res = await fetch ('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
          })

          const data = await res.json()

          if (res.ok) {
            dispatch(signInSuccess(data))
            navigate('/')
          }
        } catch (error) {
            console.log(error);
        };
    }

  return (
    <button type='button' className="google" onClick={handleGoogleClick}>
        <FcGoogle/>
        <p>Continue with Google</p>
    </button>
  )
}

export default OAuth
