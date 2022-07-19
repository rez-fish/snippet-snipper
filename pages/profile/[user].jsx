import Head from 'next/head'
import { UserAuth } from '../../context/AuthContext'
import Link from 'next/link'
import { auth } from '../../firebase'
import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import ThemeChanger from '../../components/ThemeChanger'

const Profile = () => {
  const router = useRouter()
  const { user, logout } = UserAuth()
  console.log(user)

  useEffect(() => {
    if (!user?.uid) {
      router.push('/login')
    }
  }, [router, user?.uid])

  return (
    <div>
      <ThemeChanger />
    </div>
  )
}

export default Profile
