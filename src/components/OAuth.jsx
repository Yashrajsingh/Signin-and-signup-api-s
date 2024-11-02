import React from 'react'
import { useDispatch } from 'react-redux'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {  
    const navigate = useNavigate() 
    const dispatch = useDispatch()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName, 
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to authenticate with server')
            }

            const data = await response.json()
            dispatch(signInSuccess(data))
            navigate("/")

        } catch (error) {
            console.error("Error: could not sign in with Google", error)
        }
    }

    return (
        <button 
            onClick={handleGoogleClick} 
            type='button' 
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Continue With Google
        </button>
    )
}
