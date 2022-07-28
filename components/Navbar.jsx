import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TiScissorsOutline } from 'react-icons/ti'
import { UserAuth } from '../context/AuthContext'
import { auth } from '../firebase'

const Navbar = () => {
  const { user, logout } = UserAuth()
  const router = useRouter()
  return (
    router.pathname !== '/login' && (
      <div className='navbar bg-base-200 p-2'>
        <div className='flex-1'>
          <Link href={'/'}>
            <a className='btn btn-ghost normal-case text-xl text-primary'>
              snippet
              <TiScissorsOutline />
              snipper
            </a>
          </Link>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end'>
            <label
              tabIndex='0'
              className='m-4 btn btn-ghost btn-circle avatar rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden w-15 h-15'
            >
              <div className=''>
                <Image
                  alt='place'
                  layout='fill'
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : 'https://placeimg.com/192/192/people'
                  }
                  className=''
                />
              </div>
            </label>
            <ul
              tabIndex='0'
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52 text-primary-content'
            >
              <li>
                <Link href={`/profile/${user?.uid}`}>
                  <a className='justify-between'>Profile</a>
                </Link>
              </li>
              <li>
                <a onClick={() => logout(auth)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  )
}
export default Navbar
