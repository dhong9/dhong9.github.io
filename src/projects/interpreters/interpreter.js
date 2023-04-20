import React, { useRef, useState } from "react";

import Editor from "@monaco-editor/react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function Interpreter({ codeUpdate }) {
  const editorRef = useRef(null);
  const [code, setCode] = useState("// some comment");

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const onChange = (value) => {
    setCode(value); // Update internal component
    codeUpdate(value); // Update parent component
  };

  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </>
  );
}

// Typechecking props of Interpreter component
Interpreter.propTypes = {
  codeUpdate: PropTypes.func,
};

Interpreter.defaultProps = {
  codeUpdate: null,
};

export default Interpreter;
