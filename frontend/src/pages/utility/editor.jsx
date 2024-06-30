import React,{useState}  from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';

function Editorjs(props) {
    let {type,code,theme,font,bool,class1,handle,readonly }=props
      let width='100%'
      let data='hello'
  return (
    <>
    <AceEditor
    className={class1}
        mode={type}
        theme={theme}
        name="ace-editor"
        onChange={(data1)=>handle({"code":data1,type})}
        fontSize={Number(font)}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        width={width}
        readOnly={readonly}
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

export default React.memo(Editorjs)