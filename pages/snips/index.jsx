import { auth, db } from '../../firebase'
import { useEffect, useState } from 'react'
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext'
import Router, { useRouter } from 'next/router'
import { BsPlusCircleDotted } from 'react-icons/bs'

const Snips = () => {
  const { user, logout } = UserAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [tag, setTag] = useState('')
  const [description, setDescription] = useState('')
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (!user?.uid) {
      router.push('/login')
    }
  }, [router, user?.uid])

  const submitSnip = async (title, code, tag) => {
    console.log(title + code + tag)
    if (title && code && tag) {
      try {
        await setDoc(
          doc(db, 'users', user?.uid),
          {
            snips: arrayUnion({
              title: title,
              code: code,
              tag: tag,
              description: description,
              id: Date.now(),
            }),
          },
          { merge: true }
        )
      } catch (err) {
        console.log(err)
      } finally {
        router.push('/')
      }
    } else {
      setErr(true)
      console.log('fill out fields')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mx-5 md:mx-auto mt-10'>
      <h1 className='text-3xl font-bold'>
        Enter information for your new Snip!
      </h1>
      <div className='form-control w-full mx-auto max-w-lg'>
        <label className='label'>
          <span className='label-text'>Title:</span>
        </label>
        <input
          type='text'
          placeholder='Title'
          className='input input-bordered w-full max-w-lg'
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='label mt-2'>
          <span className='label-text'>Code:</span>
        </label>
        <textarea
          className='textarea textarea-info h-60'
          placeholder='Code'
          spellCheck='false'
          style={{ fontFamily: 'PT Mono' }}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <label className='label mt-2'>
          <span className='label-text'>Optional Description:</span>
        </label>
        <textarea
          className='textarea textarea-info h-30'
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className='form-control mt-10'>
        <div className='input-group flex justify-center items-center gap-2'>
          <p className='text-xl font-semibold'>Choose Tag</p>
          <select
            className='select select-bordered'
            onChange={(e) => setTag(e.target.value)}
          >
            <option disabled defaultValue>
              Pick category
            </option>
            <option value='javascript'>JavaScript</option>
            <option value='react'>React</option>
            <option value='vue'>Vue</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
            <option value='tailwind'>Tailwind</option>
          </select>
        </div>
      </div>
      {err && (
        <p className='text-error mt-2 font-bold'>
          Fill out all fields. Description optional.
        </p>
      )}
      <button
        className='btn btn-primary btn-lg flex gap-2 text-xl mt-10'
        onClick={() => submitSnip(title, code, tag, description)}
      >
        Snip
        <BsPlusCircleDotted className='text-2xl' />
      </button>
    </div>
  )
}

export default Snips
