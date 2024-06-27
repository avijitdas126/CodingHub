import React, { useEffect, useRef, useState } from 'react';
import { ArrowBigUpDash } from 'lucide-react'
import Console from './console';
// import '../../index.css'

function Result(props) {
  let { html, css, js } = props;
  const iframeRef = useRef(null);
  const [logs, setLogs] = useState([]);
const [active, setactive] = useState(true)
const handleactive=()=>{
    setactive(!active)
}
useEffect(() => {
  const iframe = iframeRef.current;
  if (iframe) {
    // Update iframe content
    iframe.contentDocument.body.innerHTML =
      html + "<style>" + css + "</style>";

    // Override console.log in iframe
    iframe.contentWindow.console.log = (message) => {
      addLog(message);
    };
try {
  iframe.contentWindow.eval(js);
} catch (error) {
  addLog("Error : "+error.message)
}
    // Execute JavaScript code in iframe
    
  }
}, [html, css, js]);
const addLog = (message) => {
  setLogs((prevLogs) => [...prevLogs, message]);
};
  return (
    <>
    <div>
    <iframe ref={iframeRef} style={{ width: '100%', height: '300px', border: '1px solid black' }}></iframe>
<div className={`flex gap-10 p-2 rounded cursor-pointer bg-gray-950 text-white uppercase font-bold ${active?'':'logs'}`} onClick={handleactive} >
<ArrowBigUpDash />
console
    </div>
        <div className={`${active?'hidden':'block log'}`}>
        {logs.map((log, index) => (
          <Console key={index} log={log}/>
        ))}
        </div>
      </div>
      </>
  );
}

export default React.memo(Result);
