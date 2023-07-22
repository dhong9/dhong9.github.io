// React
import { useState } from "react";

// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

// CSS
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "components/DHEditor/DHEditor.css";

// https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
    />
  );
}
