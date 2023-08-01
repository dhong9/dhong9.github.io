// React
import { forwardRef, useState, useEffect, useImperativeHandle } from "react";

// Sections components
import MKInput from "components/MKInput";

// Editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

// CSS
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "components/DHEditor/DHEditor.css";

// https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
const DHEditor = forwardRef((_, ref) => {
  const [isPlainText, setIsPlainText] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [rootComment, setRootComment] = useState("");

  useImperativeHandle(ref, () => ({
    handleSetPlainText(plainTextState) {
      setIsPlainText(plainTextState);
      console.log("DHEditor isPlainText: ", plainTextState);
    },
  }));

  useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // Sanitizes HTML in editor
  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  return isPlainText ? (
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
  ) : (
    <MKInput
      variant="standard"
      InputLabelProps={{ shrink: true }}
      multiline
      fullWidth
      rows={6}
      onChange={(e) => setRootComment(e.target.value)}
      value={rootComment}
    />
  );
});

export default DHEditor;
