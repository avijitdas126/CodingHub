import { SearchIcon } from 'lucide-react'
import React from 'react'

function Search() {
  return (
    <>
    <div className='flex items-center m-2'>

    
    <input type="text" placeholder='Search a pin' autoFocus={true} className='p-2 border-solid border-2 border-black   ' />
    <button className='bg-slate-400 p-2 text-white font-bold border-solid border-2 border-slate-400 rounded'>
    <SearchIcon />
    </button>
    </div>
    </>
  )
}

export default Search