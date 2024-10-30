import React,{useEffect,useMemo,useState} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { BugIcon } from 'lucide-react';
function Error() {
  return (
    <>
     <img src="/loader.gif" alt="loader" className='m-auto p-1'/>
        <p className='text-center m-auto pt-2 mb-2 '> <kbd>Something Wrong went</kbd>  <center><BugIcon className='text-center'/></center></p>
        <center><Link to='/' className='underline text-blue-700 font-serif font-bold text-center mb-5'>Go to Home</Link></center>
    
    </>
  )
}

export default React.memo(Error)