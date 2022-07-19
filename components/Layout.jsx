import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className=''>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
