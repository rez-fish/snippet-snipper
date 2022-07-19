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

const AuthContext = createContext()
const githubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setDoc(doc(db, 'users', res.user.uid), {})
    })
  }

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user)
      })
      .catch((error) => {
        setError(error)
      })
  }

  const logout = () => {
    try {
      signOut(auth)
      console.log(user + 'before')
      console.log('Signed Out')
    } catch (error) {
      console.log(error.message)
    }
  }

  const githubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        setDoc(doc(db, 'users', res.user.uid), {})
        setUser(res.user)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser(res.user)
        setDoc(doc(db, 'users', res.user.uid), {})
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
