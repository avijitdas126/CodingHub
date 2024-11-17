import React,{useState,useEffect} from 'react'
import Theme from './utility/theme'
import { BugIcon } from 'lucide-react';
import { useParams,Link,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';



const Share = () => {
  let { id } = useParams();
  const [details, setdetails] = useState({})
  const [userid, setuseid] = useState('')
  const [iserror, setiserror] = useState(false)
  const [isload, setisload] = useState(true)
  const [start, setstart] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  let play = async (token) => {
      try {
        let fetch_data = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/check_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token}),
        });
        let res = await fetch_data.json();
        
         setisLogin(res.bool)
      } catch (error) {
        setisLogin(false)
      }
    };
  useEffect(() => {
 let token=Cookies.get('token')
 if(token){
  play(token)
 }


  
 
  }, [])
  
  useEffect(() => {
      
      let play = async () => {
        try {
          let fetch_data = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/share/`+id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            
          });
          if (!fetch_data.ok) throw Error;
  
          let res = await fetch_data.json();
          // console.log(res)
          setuseid(res?.details?.[0]?.userid)
          setdetails(res)
          setstart(true)
          setisload(false)

        } catch (error) {
          setiserror(true)
          setisload(false)
        }
      };
      play();
  }, [])
  
return (
  <>
    {isload&&(
      <img src="/code_loader.gif" alt="Loader" width={200} className='text-center mx-auto md:pt-[5%] py-[35%]' />
  )}

{iserror&&(
  <>
   <img src="/loader.gif" alt="loader" className='m-auto p-1'/>
      <p className='text-center m-auto pt-2 mb-2 '> <kbd>Something Wrong went</kbd>  <center><BugIcon className='text-center'/></center></p>
      <center><Link to='/' className='underline text-blue-700 font-serif font-bold text-center mb-5'>Go to Home</Link></center>
  
  </>
)

}

  {start&& (
      
      <Theme file={details.file_name} file_id={id} profile_name={details.profile} client_id="" Html={details.html} Css={details.css} Js={details.js} readonly={false} shareable={true} isLogin={isLogin} userid={userid}/>
  )}
  </>
)
}

export default Share
