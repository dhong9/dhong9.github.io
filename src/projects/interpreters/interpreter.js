import React, { useRef } from "react";

import Editor from "@monaco-editor/react";
import MKButton from "components/MKButton";

function Interpreter() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }

  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
      <MKButton onClick={showValue} type="submit" variant="gradient" color="info">
        Show value
      </MKButton>
    </>
  );
}

export default Interpreter;
