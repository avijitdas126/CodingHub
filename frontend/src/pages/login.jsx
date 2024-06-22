import React from 'react'
import {Formjs,Component} from './utility/Formjs'
import data from '/src/pages/utility/details.json'

function Login() {
  return (
    <>
     <Formjs title="Login Page" component={data[1].login}/>
    </>
   
  )
}

export default Login