"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Create = () => {
  return (
    <div
      id="editor"
      className="w-full min-h-8/10 h-full flex flex-col justify-evenly bg-gray-300 dark:bg-slate-900"
    >
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        className=" h-96  text-xl mx-1 text-gray-100 bg-gray-400 dark:bg-slate-900"
        // value={content}
        // onChange={setContent}
      />
      <button className="rounded-lg bg-gray-400 text-gray-100 text-lg font-semibold dark:bg-cyan-700 px-4 py-1.5 w-fit my-10 mx-auto">
        Post
      </button>
    </div>
  );
};

export default Create;
