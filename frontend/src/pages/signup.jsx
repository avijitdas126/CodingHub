import React,{useState,useEffect} from 'react'
import {Formjs,Component} from './utility/Formjs'
import data from '/src/pages/utility/details.json'

function Signup() {
  return (
    <>
    <div className='flex gap-3 justify-evenly items-center'>
<div className='md:w-1/2'>
  <img src="signup.avif" alt="signup" className='w-[80%] mx-auto hidden md:block' />
</div>
<Formjs title="Signup" component={data[0].signup} type='signup' />
    </div>

    </>
  )
}

export default Signup