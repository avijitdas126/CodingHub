
import React,{useState,useEffect} from 'react'

function Console({log='',warn=''}) {
  const [logs, setlogs] = useState('')
  const [warns, setwarns] = useState('')
  useEffect(()=>{
    if(log===undefined){
      setlogs('Error: undefined value')
    }
    else{
      setlogs(log)
      setwarns(warn)
    }
  },[log,warn])


  return (
    <>
    {logs.length!=0 &&(
  <div className={`border-solid border-black border-2 p-2 m-2 ${logs.includes('Error') && 'bg-red-200 text-red-700'}  `}>
  {logs}
     </div>
    )}
 
   {
    warns.length!=0 &&( <div className={` border-solid border-black border-2 p-2 m-2 bg-yellow-200 text-yellow-700 `}>

      {warns}
         </div>)
   }
  
    </>
  )
}

export default React.memo(Console)