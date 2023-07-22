// React
import { useState } from "react";

// Editor
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(() => newState);
    }
  };

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
  );
}
