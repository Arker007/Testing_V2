/**
 * RichTextEditor — thin wrapper around Quill 2.x
 * Uses a ref-based mount so it works with React 19 without react-quill.
 *
 * Props:
 *   value    {string}  HTML string (controlled)
 *   onChange {fn}      called with new HTML string on every keystroke
 *   placeholder {string}
 */
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "./RichTextEditor.module.css";

const TOOLBAR = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "link"],
  ["clean"],
];

export default function RichTextEditor({ value = "", onChange, placeholder }) {
  const containerRef = useRef(null); // stable outer wrapper
  const quillRef = useRef(null);
  const skipSync = useRef(false);

  // Mount Quill once (StrictMode-safe: create a fresh inner div each time)
  useEffect(() => {
    if (!containerRef.current) return;

    // Wipe any DOM left by a previous mount (StrictMode runs effects twice)
    containerRef.current.innerHTML = "";

    // Give Quill a fresh target element inside the stable container
    const editorDiv = document.createElement("div");
    containerRef.current.appendChild(editorDiv);

    const q = new Quill(editorDiv, {
      theme: "snow",
      placeholder: placeholder || "Write product description…",
      modules: { toolbar: TOOLBAR },
    });

    if (value) {
      const delta = q.clipboard.convert({ html: value });
      q.setContents(delta, "silent");
    }

    q.on("text-change", () => {
      if (!onChange) return;
      skipSync.current = true;
      const html =
        typeof q.getSemanticHTML === "function"
          ? q.getSemanticHTML()
          : q.root.innerHTML;
      onChange(html === "<p><br></p>" || html === "<p></p>" ? "" : html);
      skipSync.current = false;
    });

    const container = containerRef.current;
    quillRef.current = q;
    return () => {
      quillRef.current = null;
      // Clear toolbar + editor so the next mount starts clean
      if (container) container.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync value prop → Quill when parent changes it externally (form reset, load)
  useEffect(() => {
    const q = quillRef.current;
    if (!q || skipSync.current) return;
    const current =
      typeof q.getSemanticHTML === "function"
        ? q.getSemanticHTML()
        : q.root.innerHTML;
    const normalised = current === "<p><br></p>" || current === "<p></p>" ? "" : current;
    if (value !== normalised) {
      const delta = q.clipboard.convert({ html: value || "" });
      q.setContents(delta, "silent");
    }
  }, [value]);

  return <div className={styles.wrap} ref={containerRef} />;
}
