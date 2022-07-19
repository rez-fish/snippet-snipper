import { Html, Head, Main, NextScript } from 'next/document'
import { UserAuth } from '../context/AuthContext'
import { AuthContextProvider } from '../context/AuthContext'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
