import React from 'react'
import { PersonStanding } from 'lucide-react';
import '../../index.css'

function Formjs(props) {
let {title,component}=props;
  return (
    <>
    {/* {console.log(component)} */}
    <div className='my-20 bg-electric_indigo-600 text-white py-10 rounded mx-auto w-[80%] border-violet-900 border-solid border-2 shadow hover:shadow-lg' >
      <h1 className='text-center text-5xl font-bold underline pb-10'>{title}</h1>

      <form>
{
  
  component.map((elem,index)=>{ 
  return(
  <Component type={elem.type} key={index} label={elem.label} placeholder={elem.placeholder} required={elem.required}/>
  )})
}

<div className="flex gap-5 justify-center py-5">
<button type="reset" className='bg-white px-8 py-2 font-bold hover:shadow-2xl text-black rounded'>Clear</button>
<button type="submit" className='bg- px-8 py-2 font-bold hover:shadow-2xl rounded bg-medium_slate_blue-100'>Submit</button>
</div>


</form>

    </div>
    
    </>
  )
}
function Component(props) {
  let {type,label,placeholder,required}=props;
  return (
    <>
    <div className='mt-10 text-center px-5 flex gap-5 justify-center items-center '>
    <label htmlFor={label} className='mr-2 text-center font-bold text-xl'>  {label}: </label>
    <input type={type} placeholder={placeholder} className='p-2 w-[50%] rounded text-black' required={required} />
    </div>
    </>
  )
}

export {Formjs,Component}