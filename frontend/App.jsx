import { useState,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import MyAceEditor from './src/Editor';

function App() {
  // const editorRef = useRef(null);
  // const [count, setCount] = useState(0)
  // const notify = () => toast("Wow so easy!");
  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  // }
  // function showValue() {
  //   alert((editorRef.current.getValue()).trim());
  // }
  return (
    <>
<MyAceEditor/>

 
    </>
  )
}

export default App
