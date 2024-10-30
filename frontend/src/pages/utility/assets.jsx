import { Copy, Delete } from 'lucide-react'
import React,{useState} from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
function Asset(props) {
    let {url,delete_url,index,isbox,isNetwork=false}=props
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
    <div className={`${isbox?"w-1/5 bg-slate-200 p-2 mx-2 mt-2 rounded-md":"w-2/5 lg:w-[25%] bg-slate-200 p-2 mx-2 mt-2 rounded-md"}`}>
        <div >
            <img src={url} alt={'asset-'+index} className='rounded aspect-video'  />
        </div>
        <div className='flex justify-around pt-2 text-black relative'>
<Copy className='hover:p-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer' onClick={handleCopy} />
<span className={` bg-slate-700 text-white p-1 rounded absolute top-10 left-10 ${copy?'block':'hidden'}`} >Copied</span>
<Delete id={index} className='hover:p-1 rounded hover:bg-slate-700 hover:text-white cursor-pointer' onClick={(e)=>{
   let play=async () => {
    try {
      let token=Cookies.get('token')
      if(!token) throw new Error('Please login');
      const response = await fetch('https://codinghub-5gt0.onrender.com/user/assert/delete',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({token,id:index}),
      });
      if (!response.ok) throw new Error("Failed to delete image");
      const data = await response.json();
      console.log(data)
      toast.success('Deleted asset successfully')
      window.location.reload()
    } catch (error) {
      toast.error("Failed to delete the targeted Asset");
      console.log(error)
    }
  }
  play()
}} />
        </div>
    </div>
    
    </>
  )
}

export default Asset