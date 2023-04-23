import React, { useState, useRef } from "react";

import MonacoEditor from "react-monaco-editor";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function Interpreter({ codeUpdate }) {
  const [code, setCode] = useState("");
  const monacoRef = useRef(null);

  const keywords = ["class", "new", "string", "number", "boolean", "private", "public"];

  const editorWillMount = (monaco) => {
    monacoRef.current = monaco;

    monaco.languages.register({ id: "whitespace" });
    monaco.languages.setMonarchTokensProvider("whitespace", {
      keywords,
      tokenizer: {
        root: [
          [
            /@?[a-zA-Z][\w$]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "variable",
              },
            },
          ],
          [/".*?"/, "string"],
          [/\/\/.*/, "comment"],
        ],
      },
    });
  };

  const onChange = (value) => {
    setCode(value); // Update internal component
    codeUpdate(value); // Update parent component
  };

  return (
    <>
      <MonacoEditor
        innerRef={monacoRef}
        language="whitespace"
        value={code}
        onChange={onChange}
        editorWillMount={editorWillMount}
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
