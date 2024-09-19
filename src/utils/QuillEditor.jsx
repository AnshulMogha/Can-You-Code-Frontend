import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
const QuillEditor = ({ type, topicDes, quillRefParent }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow", // Specify theme here
        readOnly: type !== "admin" || false,
        modules:
          type === "admin"
            ? {
                toolbar: [
                  [{ header: 1 }, { header: 2 }], // custom button values
                  ["bold", "italic", "underline", "strike"], // toggled buttons
                  ["blockquote", "code-block"],
                  ["link", "image", "video", "formula"],

                  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                  [{ script: "sub" }, { script: "super" }], // superscript/subscript
                  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                  [{ direction: "rtl" }], // text direction

                  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],

                  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                  [{ font: [] }],
                  [{ align: [] }],

                  ["clean"],
                ],
              }
            : { toolbar: false },
      });
      quillRefParent.current = quillRef.current;
    }
    quillRef.current.setContents(topicDes ? JSON.parse(topicDes) : "");
    // quillRef.current.on("text-change", handleTextChange);
    return () => {
      // Cleanup Quill instance on component unmount
      // if (quillRef.current) {
      //   quillRef.current.off("text-change", handleTextChange);
      // }
    };
  }, [topicDes, type, quillRefParent]);

  return (
    <div
      ref={editorRef}
      style={{
        minHeight: "30vh",
        width: "100%",
        border: "none",
      }}
      className="editor"
    />
  );
};

export default QuillEditor;
