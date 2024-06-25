import React, { useEffect, useRef, useState } from 'react';

const App1 = () => {
  const iframeRef = useRef(null);
  const [htmlCode, setHtmlCode] = useState('<h1>Hello World</h1>');
  const [cssCode, setCssCode] = useState('h1 { color: blue; }');
  const [jsCode, setJsCode] = useState('console.log("Hello from iframe!");');
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      // Update iframe content
      iframe.contentDocument.body.innerHTML =
        htmlCode + "<style>" + cssCode + "</style>";

      // Override console.log in iframe
      iframe.contentWindow.console.log = (message) => {
        addLog(message);
      };

      // Execute JavaScript code in iframe
      iframe.contentWindow.eval(jsCode);
    }
  }, [htmlCode, cssCode, jsCode]);

  const addLog = (message) => {
    setConsoleLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <div>
      <h1>Interactive Iframe Editor</h1>
      <div>
        <textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          placeholder="HTML code"
        />
        <textarea
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          placeholder="CSS code"
        />
        <textarea
          value={jsCode}
          onChange={(e) => setJsCode(e.target.value)}
          placeholder="JavaScript code"
        />
      </div>
      <iframe ref={iframeRef} style={{ width: '100%', height: '300px', border: '1px solid black' }}></iframe>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        <h2>Console Logs</h2>
        {consoleLogs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default App1;
