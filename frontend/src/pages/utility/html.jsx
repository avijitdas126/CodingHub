import {React,useState}  from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';

function Html(props) {
    const handleChange = (newValue) => {
        console.log('change', newValue);
      };
  return (
    <>
    <AceEditor
        mode="html"
        theme={props.theme}
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`<h1>Hello World</h1>`}
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

export default Html