// React
import { useState, useEffect } from "react";

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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
export default function DHEditor(props) {
  const { isPlainText } = props;

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [rootComment, setRootComment] = useState("");

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
}

// Typechecking props of FeaturedPost
DHEditor.propTypes = {
  isPlainText: PropTypes.bool,
};

DHEditor.defaultProps = {
  isPlainText: false,
};
