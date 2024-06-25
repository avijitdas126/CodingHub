import React,{useState} from 'react'
import Search from './search'
import { MenuIcon,X } from 'lucide-react'

function Nav(props) {
    const {parallel,data,logo,search,profile_url,profile_img,profile}=props
    const [close, setclose] = useState(false)
    const handle=()=>{
setclose(!close)
    }
  return (
    <>
    {/* <Search /> */}



<div className={`${parallel&&'flex w-full bg-slate-500 text-white items-center justify-between'}` }>



   {logo&&(
    <div className="logo p-2">
        <a href="/">
        <img src="/icons8-code-64.png" alt="logo" />
        </a>
    </div>
   )}
    
<div className='hidden lg:block'>
    <nav>
        <ul className={`${parallel?'flex':'grid'} gap-4 bg-slate-500 text-white p-2  ${parallel? 'w-full':'lg:w-1/5'} w-1/4 `}>
       {
        (props.data.dashboard).map((elem,index)=>{
return(
    <li key={index} className='p-2 hover:bg-slate-600 rounded'><a href={elem.route}>{elem.item}</a></li>
)
 })

       }
    
        </ul>
    </nav>
</div>
<div className='flex gap-2 items-center relative'>
 
{search && (<Search/>)}
<MenuIcon  onClick={handle} className={` bg-slate-400 text-white hover:bg-slate-600 ${close && 'hidden'} block lg:hidden m-2`}/>
{close?(<X onClick={handle} className={` bg-slate-400 text-white hover:bg-slate-600 block lg:hidden m-2`} />):('')}
{close && (
    
    <div className={`block lg:hidden absolute top-14 m-2  z-50 w-[200px] lg:w-1/5 ${profile &&'right-0'}`}>
    <nav>
        <ul className='grid gap-4 bg-slate-500 text-white p-2 shadow '>
       {
        (data.dashboard).map((elem,index)=>{
return(
    <li key={index} className='p-2 hover:bg-slate-600 rounded'><a href={elem.route}>{elem.item}</a></li>
)
 
})

       }
    
        </ul>
    </nav>
</div>

)}

{/*  */}
{profile &&(

<div>
<a href={profile_url}>
    <img src={profile_img} alt="profile" className='rounded-full' />
</a>
</div>
)}

</div>

</div>

    
    </>
  )
}

export default Nav