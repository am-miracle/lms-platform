"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
  onChange: (value: string) => void;
  value: string;
};
const Editor = React.forwardRef<HTMLButtonElement, EditorProps>(
  ({ value, onChange }, ref) => {
    const ReactQuill = React.useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
    );
    return (
      <div className="bg-white">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder="Write your content here..."
        />
      </div>
    );
  }
);

Editor.displayName = "Editor";
export default Editor;
