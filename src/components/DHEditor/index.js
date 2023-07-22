// React
import { useState } from "react";

// Editor
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Handle common key command (i.e. copy/paste)
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(() => newState);
    }
  };

  // Styling controls
  const _onBoldClick = () => {
    setEditorState(() => RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  return (
    <>
      <button onClick={_onBoldClick}>Bold</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </>
  );
}
