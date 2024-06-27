import React from 'react'
import Nav from './utility/nav'
import data from "/src/pages/utility/details.json";
import Card from './utility/card';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <>
    <div className='flex '>

    
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
      />
      <div className='bg-red-200 w-full h-[100vh] relative overflow-x-hidden'>
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
        style={{width:'90vw'}}
      />
  <div className='grid gap-2 mt-16 '>
  {/* < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/>
  < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/>
  < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/>
  < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/>
  < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/>
  < Card bool={false} user_name="Avijit Das" file_name="Hello_world" des={'lroem'}/> */}
  </div>
  <div className='btn w-10 fixed bottom-2 right-5 z-50'>
<Plus />
</div>
      </div>
      </div>
    </>
  )
}

export default Dashboard
