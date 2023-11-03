import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactQuill from "react-quill";

const Form = () => {
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
    "font",
    "size",
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
    "color",
  ];
  return (
    <div
      id="Quill-editor"
      className="w-full h-full flex flex-col justify-evenly bg-gray-400 dark:bg-slate-900"
    >
      <div className="h-[80%] flex flex-col items-center justify-start  ">
        <div className="bg-gray-300 dark:bg-slate-900 h-full">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className="h-[80%] text-xl mx-1  text-gray-950 bg-gray-300 dark:text-gray-100 dark:bg-slate-900"
          // value={content}
          // onChange={setContent}
        />
        </div>
        <div className="w-full px-1 ">
          <span className="block text-sm font-medium text-white my-2 ">Separate categories by #</span>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-2 border-2 border-sky-400 dark:border-sky-700 dark:bg-sky-900 bg-sky-100"
            placeholder="Tags : #vocabulary #grammar "
          />
        </div>
      </div>

      <button className="rounded-lg bg-gray-400 text-gray-100 text-lg font-semibold dark:bg-cyan-700 px-4 py-1.5 w-fit mt-2 mx-auto">
        Post
      </button>
    </div>
  );
};

export default Form;
