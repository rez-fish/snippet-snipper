import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

const ThemeChanger = () => {
  const { user } = UserAuth()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [themeState, setThemeState] = useState('')
  const route = useRouter()

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ]

  useEffect(() => {
    if (!user?.uid) {
      route.push('/')
      return
    }
    setTheme(theme)
    console.log(theme)
    updateDoc(doc(db, 'users', user?.uid), { theme: theme }, { merge: true })
  }, [theme, setTheme, user, route])

  const handleThemeChange = (e) => {
    setTheme(e.target.value)
  }

  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <div className='form-control m-10'>
      <div className='input-group flex items-center'>
        <p className='text-2xl font-bold'>Change Theme: </p>
        <select
          className='select select-bordered'
          onChange={(e) => handleThemeChange(e)}
        >
          <option disabled defaultValue>
            Pick category
          </option>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ThemeChanger
