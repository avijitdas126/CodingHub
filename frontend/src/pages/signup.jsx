import React from 'react'
import {Formjs,Component} from './utility/Formjs'
import data from '/src/pages/utility/details.json'

function Signup() {
  return (
    <>
<Formjs title="SignUp Page" component={data[0].signup}/>
    </>
  )
}

export default Signup