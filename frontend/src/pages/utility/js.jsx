import {React,useState}  from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';

function Js(props) {
    const handleChange = (newValue) => {
        console.log('change', newValue);
      };
  return (
    <>
    <AceEditor
        mode="javascript"
        theme={props.theme}
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`function hello() {\n  console.log("Hello, world!");\n}`}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    
    </>
  )
}

export default Js