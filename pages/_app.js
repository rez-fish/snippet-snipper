import Layout from '../components/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import '../node_modules/highlight.js/styles/panda-syntax-dark.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    themeChange(false)
  })

  return (
    <ThemeProvider themes={'retro'}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
