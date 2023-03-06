import React, { useRef } from "react";

import Editor from "@monaco-editor/react";

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
      <button type="submit" onClick={showValue}>
        Show value
      </button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </>
  );
}

export default Interpreter;
