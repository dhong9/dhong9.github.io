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
  const handleInlineStyle = (e, style) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <>
      <div>
        <button onMouseDown={(e) => handleInlineStyle(e, "BOLD")}>Bold</button>
        <button onMouseDown={(e) => handleInlineStyle(e, "ITALIC")}>Italic</button>
        <button onMouseDown={(e) => handleInlineStyle(e, "UNDERLINE")}>Underline</button>
        <button onMouseDown={(e) => handleInlineStyle(e, "CODE")}>Code</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </>
  );
}
