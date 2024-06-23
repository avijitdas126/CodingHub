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
      iframe.onload = () => {
        const iframeWindow = iframe.contentWindow;
        if (iframeWindow) {
          // Save original console.log method
          const originalLog = iframeWindow.console.log;

          // Override console.log method
          iframeWindow.console.log = (message) => {
            setLogs((prevLogs) => [...prevLogs, message]);
            originalLog.apply(iframeWindow.console, [message]);
          };
       // Load some content into the iframe (for demonstration)
       iframeWindow.document.open();
       iframeWindow.document.write(`
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
       `);
       iframeWindow.document.close();
     }
   };
 }
}, [html,js,css]);
const generateSrcDoc = () => {
    return `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
  };
  return (
    <>
    <div>
      <iframe  srcDoc={generateSrcDoc()} ref={iframeRef} style={{ width: '100%', height: '300px', border: '1px solid black' }}></iframe>
<div className=' flex gap-10 p-2 rounded cursor-pointer bg-gray-950 text-white uppercase font-bold' onClick={handleactive}>
<ArrowBigUpDash />
console
    </div>
        <div className={`${active?'hidden':'block'}`}>
        {logs.map((log, index) => (
          <Console key={index} log={log}/>
        ))}
        </div>
      </div>
      </>
  );
}

export default Result;
