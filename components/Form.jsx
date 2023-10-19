import React from 'react'
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
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'color',
          
          ];
  return (
      <div
      id="Quill-editor"
      className="w-full h-full flex flex-col justify-evenly bg-gray-300 dark:bg-slate-900"
    >

      <div className="w-full h-1/2">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        className=" h-full text-xl mx-1 text-gray-950 bg-gray-300 dark:text-gray-100 dark:bg-slate-900"
        // value={content}
        // onChange={setContent}
      />
      </div>

      <button className="rounded-lg bg-gray-400 text-gray-100 text-lg font-semibold dark:bg-cyan-700 px-4 py-1.5 w-fit my-50 mx-auto">
        Post
      </button>
    </div>  )
}

export default Form