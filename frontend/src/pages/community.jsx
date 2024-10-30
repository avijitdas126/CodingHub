import React from 'react'
import Nav from './utility/nav'
import data from "/src/pages/utility/details.json";
import Card from './utility/card';
import { Plus } from 'lucide-react';
import { NavLink } from "react-router-dom";
const Community = () => {
  return (
    <>
       <div className='flex w-full'>

    
<Nav
  data={data[2].dashboard}
  color={'#000000'}
  parallel={false}
  logo={false}
  textColor=''
  searchIconColor={'blue'}
  search={false}
  profile={false}
  profile_url={"/"}
  user={false}
  user_img={'/download.jfif'}
  profile_img={
    "https://lh3.googleusercontent.com/ogw/AF2bZyhGZHzvEXxL4xS4OxPKg60bWU-gzRssFPPutFiVBsdLftg=s32-c-mo"
  }
  className='w-[15%]'
/>
<div className='bg-red-200 w-[85%] h-[100vh] relative overflow-x-hidden'>
<Nav

  data={[]}
  color={'gray'}
  parallel={true}
  logo={true}
  textColor=''
  searchIconColor={'blue'}
  search={true}
  profile={true}
  profile_url={"/"}
  user={false}
  user_img={'/download.jfif'}
  profile_img={
    "https://lh3.googleusercontent.com/ogw/AF2bZyhGZHzvEXxL4xS4OxPKg60bWU-gzRssFPPutFiVBsdLftg=s32-c-mo"
  }
  half={true}
  className='w-[85%]'
/>
<div className='grid gap-2 mt-16 '>

</div>
<div className='btn w-10 fixed bottom-2 right-5 z-50'>
<Plus />
</div>
</div>
</div>
    </>
  )
}

export default Community
