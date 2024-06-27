
import React,{useState,useEffect} from 'react'

function Console({log}) {
  const [logs, setlogs] = useState('')
  useEffect(()=>{
    if(log===undefined){
      setlogs('Error: undefined value')
    }
    else{
      setlogs(log)
    }
  },[log])


  return (
    <>
   <div className={`border-solid border-black border-2 p-2 m-2 ${logs.includes('Error') && 'bg-red-200 text-red-700'} `}>
{logs}
   </div>
    </>
  )
}

export default React.memo(Console)