import React from 'react'
import {Formjs,Component} from './utility/Formjs'
import data from '/src/pages/utility/details.json'

function Login() {
  return (
    <>
   < div className='flex gap-3 justify-evenly items-center'>
<div className='md:w-1/2'>
  <img src="login.avif" alt="signup" className='w-[80%] mx-auto hidden md:block' />
</div>
     <Formjs title="Login Page" component={data[1].login} type='login'/>
     </div>
    </>
   
  )
}

export default Login