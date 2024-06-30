import React,{useState,useEffect} from 'react'
import Theme from './utility/theme'
import { BugIcon } from 'lucide-react';
import { useParams,Link } from "react-router-dom";
import Cookies from 'js-cookie';
const EditorFile = () => {
    let {profile,file_name,id,mode}=useParams()
    const [reload, setreload] = useState(true)
    const [html, sethtml] = useState(undefined)
    const [css, setcss] = useState(undefined)
    const [js, setjs] = useState(undefined)
    const [start, setstart] = useState(false)
    const [error, seterror] = useState(false)
    const [load, setload] = useState(true)
    let htmldefault='<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n<h1>Hello CodeHub</h1>\n</body>\n</html>'
    let cssdefault='*\n{\nmargin:0;\npadding:0;\nbox-sizing:border-box;\n}'
    let jsdefault='console.log("Hello CodeHub")'    
    useEffect(() => {
        const data = { token: Cookies.get('token'), code_id: id };
    
        const fetchCode = async () => {
            try {
                const response = await fetch('http://localhost:9000/user/code/showcode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                const {html,css,js}=responseData
                if(html.length==0&&css.length==0&&js.length==0){
                    sethtml(htmldefault);
                    setcss(cssdefault);
                    setjs(jsdefault);
                }
                else{
                    sethtml(responseData.html);
                    setcss(responseData.css);
                    setjs(responseData.js);
                }
                setload(false)
                setstart(true)
                
                console.log(responseData);
            } catch (error) {
                // console.error('Error:', error);
                setload(false)
                seterror(true)
            }
        };
    
        fetchCode();
    }, [reload, id]);
    
    
   
    mode=Number(mode)
    console.log(useParams())
  return (
    <>
    {load&&(
        <img src="/code_loader.gif" alt="Loader" width={200} className='text-center mx-auto md:pt-[5%] py-[35%]' />
    )}

{error&&(
    <>
     <img src="/loader.gif" alt="loader" className='m-auto p-1'/>
        <p className='text-center m-auto pt-2 mb-2 '> <kbd>Something Wrong went</kbd>  <center><BugIcon className='text-center'/></center></p>
        <center><Link to='/' className='underline text-blue-700 font-serif font-bold text-center mb-5'>Go to Home</Link></center>
    
    </>
)

}
    {start&& (
        
        <Theme file={file_name} file_id={id} profile_name={profile} client_id="" Html={html} Css={css} Js={js} readonly={false}/>
    )}

    </>
  )
}
export default EditorFile
