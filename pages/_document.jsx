import { Html, Head, Main, NextScript } from 'next/document'
import { UserAuth } from '../context/AuthContext'
import { AuthContextProvider } from '../context/AuthContext'

export default function Document() {
  return (
    <Html>
      <Head />
      <link
        rel='stylesheet'
        href='https://highlightjs.org/static/demo/styles/railscasts.css'
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
