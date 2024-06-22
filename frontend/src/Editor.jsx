// src/CodeEditor.js
import React from 'react';
import AceEditor from 'react-ace';

// Import Ace Editor modes and themes
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = () => {
  const handleChange = (newValue) => {
    console.log('change', newValue);
  };

  return (
    <div className='flex gap-5'>
      <AceEditor
        mode="javascript"
        theme="monokai"
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
      {/* <br /> */}
      <AceEditor
        mode="html"
        theme="monokai"
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`<h1>hello</h1>`}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      {/* <br /> */}
      <AceEditor
        mode="css"
        theme="monokai"
        name="ace-editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`<h1>hello</h1>`}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
