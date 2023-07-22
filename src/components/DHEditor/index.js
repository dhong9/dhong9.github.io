// React
import { useState, useEffect } from "react";

// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

// CSS
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "components/DHEditor/DHEditor.css";

// https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
export default function DHEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // Sanitizes HTML in editor
  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </>
  );
}
