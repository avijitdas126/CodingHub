import Reac,{useEffect,useMemo,useState} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { BugIcon } from 'lucide-react';

function Auth() {
    let {type}=useParams()
    const [token1, settoken] = useState(null)
    const [error, seterror] = useState(false)
  const [client_id, setclient_id] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      settoken(token);
      verifyToken(token);
    } else {
      settoken(null);
      navigate('/login');
    }
  }, [navigate]);

const verifyToken=(token)=>{
console.log('call')
let payload={token}
// console.log(payload)
fetch('https://codinghub-5gt0.onrender.com/user/check_token',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
        .then((responseData) => {
let {client_id,userid}=responseData.bool
Cookies.set('userid',userid,{expires:90})
 setclient_id(client_id)
if(type.includes('dashboard')){
    navigate('/dashboard/'+ client_id)
}
else if(type.includes('live')){
    navigate('/live/'+ client_id)
}
else if(type.includes('community')){
    navigate('/community/'+client_id)
}
else{
seterror(true)
}
})
.catch((error) => {
    console.log(error)
navigate('/login')
})
}
  return (
    <>
     <img src="./loader.gif" alt="loader" className='m-auto p-1'/>
   
    <div className={`${error ?'block':'hidden'}`}>
     <p className='text-center m-auto pt-2 mb-2 '> <kbd>Something Wrong went</kbd>  <center><BugIcon className='text-center'/></center></p>
     <center><Link to='/' className='underline text-blue-700 font-serif font-bold text-center mb-5'>Go to Home</Link></center>
     </div>
    </>
  )
}

export default Auth
