import Highlight from 'react-highlight'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdCopyAll } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import { RiDeleteBinLine } from 'react-icons/ri'
import {
  doc,
  updateDoc,
  deleteField,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css'
import { UserAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'

const Snip = ({ current }) => {
  const notify = () => toast.success('Snip Snipped!')
  const { user, logout, snips, updateSnips, deleteSnip } = UserAuth()

  return (
    <>
      <div className=''>
        <div tabIndex='0' className='collapse bg-neutral relative'>
          <div className='collapse-title text-xl font-medium p-6'>
            <p className='text-primary font-bold'>{current.title}</p>
            <h2 className='text-neutral-content'>{current.tag}</h2>
            <CopyToClipboard text={current.code}>
              <button
                className='btn btn-ghost absolute top-0 right-0 text-xl text-primary'
                onClick={notify}
              >
                <MdCopyAll />
              </button>
            </CopyToClipboard>
            <button
              className='btn btn-ghost absolute right-0 bottom-0 text-error text-2xl'
              onClick={() =>
                deleteSnip(
                  current.id,
                  current.title,
                  current.code,
                  current.tag,
                  current.description
                )
              }
            >
              <RiDeleteBinLine />
            </button>
          </div>
          <div className='collapse-content'>
            <Highlight>{current.code}</Highlight>
            <p className='text-neutral-content mt-2'>{current.description}</p>
            <p>{current.id}</p>
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
        theme='colored'
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default Snip
