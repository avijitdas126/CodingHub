
import React,{useState,useEffect} from 'react'

function Console(props) {
  return (
    <>
   <div className='border-solid border-black border-2 p-2 m-2'>
{props.log}
   </div>
    </>
  )
}

export default Console