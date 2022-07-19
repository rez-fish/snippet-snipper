import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

const AuthContext = createContext()
const githubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const route = useRouter()

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setDoc(doc(db, 'users', res.user.uid), {})
    })
    setLoggedIn(true)
  }

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user)
        setLoggedIn(true)
      })
      .catch((error) => {
        setError(error)
      })
  }

  const logout = () => {
    try {
      route.push('/')
      signOut(auth)
      setLoggedIn(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const githubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        // setDoc(doc(db, 'users', res.user.uid), {})
        setUser(res.user)
        setLoggedIn(true)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser(res.user)
        // setDoc(doc(db, 'users', res.user.uid), {})
        setLoggedIn(true)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, async (user) => {
      setUser(user)
    })
    return checkUser
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        error,
        logIn,
        logout,
        githubLogin,
        GithubAuthProvider,
        googleLogin,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
