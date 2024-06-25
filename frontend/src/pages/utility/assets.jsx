import { Copy, Delete } from 'lucide-react'
import React,{useState} from 'react'

function Asset(props) {
    let {url,delete_url,index}=props
    const [copy, setcopy] = useState(false)
    const handleCopy=async()=>{
        try {
            await navigator.clipboard.writeText(url);
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
        setcopy(true)
setTimeout(()=>{
    setcopy(false)
},4000)
    }
  return (
    <>
    <div className='w-1/5 bg-slate-200 p-2 mx-2 mt-2 rounded-md'>
        <div>
            <img src={url} alt={'asset-'+index} className='rounded aspect-video' />
        </div>
        <div className='flex justify-around p-4 relative'>
<Copy className='hover:p-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer' onClick={handleCopy}/>
<span className={`bg-black text-white p-1 rounded absolute top-10 left-10 ${copy?'block':'hidden'}`} >Copied</span>
<Delete className='hover:p-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer' />
        </div>
    </div>
    
    </>
  )
}

export default Asset