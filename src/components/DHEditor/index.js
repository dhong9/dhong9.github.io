// React
import { useState } from "react";

// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return <Editor editorState={editorState} onEditorStateChange={setEditorState} />;
}
