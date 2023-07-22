// React
import { useState, useCallback } from "react";

// Editor
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Handle common key command (i.e. copy/paste)
  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  });

  // Styling controls
  const handleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <>
      <div>
        <button onClick={() => handleInlineStyle("BOLD")}>Bold</button>
        <button onClick={() => handleInlineStyle("ITALIC")}>Italic</button>
        <button onClick={() => handleInlineStyle("UNDERLINE")}>Underline</button>
        <button onClick={() => handleInlineStyle("CODE")}>Code</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </>
  );
}
