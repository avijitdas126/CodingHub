import {React,useState}  from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-css';

function Css(props) {
    const handleChange = (newValue) => {
        console.log('change', newValue);
      };
  return (
    <>
    <AceEditor
        mode="css"
        theme={props.theme}
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`*{margin:0;padding:0;}`}
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

export default Css