"use client"

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  setValue: (value: string) => void;
}
export function TextEditor({ value, setValue }: TextEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ height: "260px" }}
    />
  );
}
