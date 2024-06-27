import React,{useEffect,useState} from 'react'
import { PersonStanding } from 'lucide-react';
import '../../index.css'
import Cookies from 'js-cookie';
function Formjs(props) {
let {title,component,type}=props;
const [data, setdata] = useState([
  {
    'token':Cookies.get('token')
  }
])

const [submit, setsubmit] = useState(false)
useEffect(() => {
  // Initialize the data object
  const initialData = component.reduce((acc, elem) => {
    acc[elem.name] = '';
    return acc;
  }, {});
  setdata(initialData);
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

          console.log(responseData);
          Cookies.set('token', responseData.token, { expires: 90 });
        })
        .catch((error) => {
          console.error('Error:', error);
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
    <div className='my-20 md:mx-10 bg-electric_indigo-600 text-white py-10 rounded mx-auto w-[80%] border-violet-900 border-solid border-2 shadow hover:shadow-lg' >
      <h1 className='text-center text-5xl font-bold underline pb-10'>{title}</h1>

      <form onSubmit={handleSubmit}>
{
  
  component.map((elem,index)=>{ 
  return(
  <Component type={elem.type} key={index} label={elem.label} onChange={handleChange} placeholder={elem.placeholder} name={elem.name} data={data} required={elem.required}/>
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
  let { type, label, placeholder, required, data, name, onChange }=props;
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };
 {console.log(data)}
  return (
    <>
    <div className='mt-10 text-center px-5 flex gap-5 justify-center items-center '>
    <label htmlFor={label} className='mr-2 text-center font-bold text-xl'>  {label}: </label>
    <input type={type} placeholder={placeholder} className='p-2 w-[50%] rounded text-black' onChange={handleChange} name={name} required={required}  />
    </div>
    </>
  )
}

export {Formjs,Component}

