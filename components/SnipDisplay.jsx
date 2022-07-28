import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import Snip from './Snip'

const SnipDisplay = ({ snips }) => {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('')
  const [filteredSnips, setFilteredSnips] = useState()
  const { deletedSnip } = UserAuth()
  const [filtering, setFiltering] = useState(false)

  useEffect(() => {
    if (deletedSnip !== 0) {
      setFiltering(false)
    }
  }, [setFiltering, deletedSnip])

  const applyFilter = () => {
    const test = filter()
    setFilteredSnips([...test])
  }

  const filter = () => {
    setFiltering(true)
    if (search && tag) {
      return snips.filter(
        (snip) => snip.title.includes(search) && snip.tag === tag
      )
    } else if (search && !tag) {
      return snips.filter((snip) => snip.title.includes(search))
    } else if (!search && tag) {
      return snips.filter((snip) => snip.tag === tag)
    }
    if (deletedSnip.id !== 0) {
      return snips.filter((snip) => snip.id !== deletedSnip.id)
    }
  }

  return (
    <div className='my-10 w-24 min-w-full mx-[500px]'>
      <div className='form-control gap-4'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-bordered'
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className='select select-bordered'
          onChange={(e) => setTag(e.target.value)}
        >
          <option disabled className='text-accent'>
            Pick category
          </option>
          <option value='' defaultValue>
            None
          </option>
          <option value='javascript'>JavaScript</option>
          <option value='react'>React</option>
          <option value='vue'>Vue</option>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
          <option value='tailwind'>Tailwind</option>
        </select>
        <div className='flex gap-4 mx-auto flex-wrap'>
          <button className='btn btn-wide flex-1' onClick={() => applyFilter()}>
            Apply Filter
          </button>
          <button
            className='btn btn-wide flex-1'
            onClick={() => {
              setFiltering(false)
              setFilteredSnips([])
            }}
          >
            Clear Filter
          </button>
        </div>
        {filtering && (
          <p className='text-info font-bold'>
            Note: Filters are cleared after deletion.
          </p>
        )}
        {!filtering &&
          snips.map((snip) => <Snip current={snip} key={snip.id} />)}
        {filtering &&
          filteredSnips.map((snip) => <Snip current={snip} key={snip.id} />)}
      </div>
    </div>
  )
}

export default SnipDisplay
