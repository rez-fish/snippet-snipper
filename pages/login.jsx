import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiGithub } from 'react-icons/fi'
import { UserAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(true)
  const { signUp, user, logIn, githubLogin, googleLogin, error } = UserAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.uid) {
      router.push('/')
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    if (loggingIn) {
      try {
        await logIn(email, password)
      } catch (error) {
        console.log(error)
      }
    }

    if (!loggingIn) {
      try {
        await signUp(email, password)
        // router.push('/')
        console.log('loggin in ' + user)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          {loggingIn && <h1 className='text-5xl font-bold'>Start Snipping!</h1>}
          {!loggingIn && <h1 className='text-5xl font-bold'>Welcome!</h1>}
          {loggingIn && (
            <div>
              <p className='py-6'>
                Start saving your blocks now by logging in.
              </p>
              <p className=''>
                Need an account?{' '}
                <span
                  className='text-info font-bold cursor-pointer'
                  onClick={() => setLoggingIn(!loggingIn)}
                >
                  Register
                </span>
              </p>
              {error?.toString().includes('auth/user-not-found') && (
                <p className='text-warning font-bold'>No User Found</p>
              )}
              {error?.toString().includes('auth/wrong-password') && (
                <p className='text-warning font-bold'>Wrong Password</p>
              )}
            </div>
          )}
          {!loggingIn && (
            <div>
              <p className='py-6'>Create an account to start snipping.</p>

              <p className=''>
                Already Snipping?{' '}
                <span
                  className='text-info font-bold cursor-pointer'
                  onClick={() => setLoggingIn(!loggingIn)}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <form action='submit'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='text'
                  placeholder='email'
                  className='input input-bordered'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='form-control mt-4'>
                {loggingIn && (
                  <button
                    className='btn btn-primary'
                    onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>
                )}
                {!loggingIn && (
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={(e) => handleLogin(e)}
                  >
                    Register
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
