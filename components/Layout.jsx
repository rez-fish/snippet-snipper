import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className='h-screen'>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
