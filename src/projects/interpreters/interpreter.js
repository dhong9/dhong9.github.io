import React, { useState, useRef } from "react";

import MonacoEditor from "react-monaco-editor";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Language syntax highlighting configuration
import esoterics from "./esoterics";

function Interpreter({ codeUpdate, language }) {
  const [code, setCode] = useState("");
  const monacoRef = useRef(null);

  const keywords = esoterics[language].keywords;

  const editorWillMount = (monaco) => {
    monacoRef.current = monaco;

    monaco.languages.register({ id: language });
    monaco.languages.setMonarchTokensProvider(language, {
      keywords,
      tokenizer: {
        root: [
          [new RegExp(`[${keywords.join("")}]+`), "keyword"],
          [/;.*/, "comment"],
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
        language={language}
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
  language: PropTypes.string,
};

Interpreter.defaultProps = {
  codeUpdate: null,
  language: "",
};

export default Interpreter;
