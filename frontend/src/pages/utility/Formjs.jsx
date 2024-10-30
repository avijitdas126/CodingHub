import React,{useEffect,useState} from 'react'
import { PersonStanding } from 'lucide-react';
import '../../index.css'
import Cookies from 'js-cookie';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Formjs(props) {
  let navigator=useNavigate()
let {title,component,type}=props;
const [data, setdata] = useState(
  {
    'token':Cookies.get('token')
  }
)
console.log(data)
const [submit, setsubmit] = useState(false)
useEffect(() => {
  // Initialize the data object
  component.map((elem)=>{
    setdata((olddata)=>({
      ...olddata,[elem.name]:''
    })) 
  })
   
   console.log(component,data)
  
}, [component]);

const handleChange = (name, value) => {
  setdata((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  setsubmit(true)
  console.log("Form submitted with data:", data);
};
useEffect(() => {
  if (submit) {
    const url = type.includes('signup')
      ? 'http://localhost:9000/user/signup'
      : type.includes('login')
      ? 'http://localhost:9000/user/login'
      : '';
      if(data['token']==undefined){
        setdata((prevData) => ({
          ...prevData,
          ['token']: '',
        }));
      }
    if (url) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if(Number(responseData.code)==200){
            Cookies.set('token', responseData.token, { expires: 90 });
            toast.success(responseData.msg)
            console.log(data)
            navigator('/dashboard')
          }
          else{
toast.error(responseData.msg)
          }
          // console.log(responseData);

        })
        .catch((error) => {
          toast.error('Something went wrong')
          // console.error('Error:', error);
        })
        .finally(() => {
          setsubmit(false); // Reset submit state
        });
    }
  }
}, [submit, data, type]);

  return (
    <>
    {/* {console.log(component)} */}
    <div className='my-10 md:mx-10 bg-electric_indigo-600 text-white py-10 rounded mx-auto w-[80%] border-violet-900 border-solid border-2 shadow hover:shadow-lg' >
      <h1 className='text-center text-5xl font-bold underline pb-10'>{title}</h1>

      <form onSubmit={handleSubmit}>
{
  
  component.map((elem,index)=>{ 
  return(
  <Component type={elem.type} key={index} label={elem.label} onChange={handleChange} placeholder={elem.placeholder} name={elem.name} data={data} required={elem.required} display={elem.display}/>
  )})
}

<div className="flex gap-5 justify-center py-5">
<button type="reset" className='bg-white px-8 py-2 font-bold hover:shadow-2xl text-black rounded'>Clear</button>
<button type="submit" className='bg- px-8 py-2 font-bold hover:shadow-2xl rounded bg-medium_slate_blue-100'>Submit</button>

<ToastContainer />

</div>


</form>
{type.includes('signup') &&
(<>
<center>
<Link to='/login' className='text-center mx-auto text-xl font-bold underline '>Already have a account?</Link>
</center>
{/* <Link to='/login' className='text-center mx-auto'>Already have a account?</Link> */}
</>)

}
{type.includes('login') &&
(<>
<center>
<Link to='/signup' className='text-center mx-auto text-xl font-bold underline '>Have no account?</Link>
</center>
{/* <Link to='/login' className='text-center mx-auto'>Already have a account?</Link> */}
</>)

}
    </div>
    
    </>
  )
}
function Component(props) {
  let { type, label, placeholder, required, data,autoFocus, name, onChange,display,disabled,value }=props;
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

 const [typ, settyp] = useState(type)
 const hand=()=>{
  if(typ.includes('text')){
    settyp('password')
  }
  else{
    settyp('text')
  }
  
 }
  return (
    <>
   <div className={`grid px-5 gap-2 ${!display && 'hidden'}`}>
   <div className='mt-10 text-center  flex gap-5 justify-center items-center '>
    <label htmlFor={label} className='mr-2 text-center font-bold text-xl'>  {label}: </label>
    <input type={typ} placeholder={placeholder} className='p-2 w-[50%] rounded text-black' onChange={handleChange} name={name} required={required} disabled={disabled} value={value}  autoFocus={autoFocus} />
    </div>
    {type.includes('password') &&(
      <>
      <div className='flex gap-4 pt-2 justify-center'>
    <input type="checkbox" name="type" className='' onChange={hand} /> 
    <p>Show Me</p>
    </div>
      </>
    )}
   </div>
    </>
  )
}

export {Formjs,Component}

