import React from 'react';
import { BsArrowBarUp } from "react-icons/bs";

const FileUpload = ({ label, onFileSelect }) => {
  return (
    <div className="mb-4">
      <p className="mb-2 block text-base">{label}</p>
      <button
        className="flex items-center"
        onClick={() => document.getElementById(`fileInput-${label}`).click()}
      >
        <div className="border-current rounded-lg border bg-blue-700 px-5 py-2.5 text-sm font-medium tracking-wider text-white outline-none hover:bg-blue-800 active:bg-blue-700">
          <BsArrowBarUp style={{ height: "30px", width: "30px" }} />
        </div>
        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
          <p className="mb-1 text-left text-base font-medium text-gray-900">
            Upload {label}
          </p>
        </div>
        <input
          id={`fileInput-${label}`}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={(e) => onFileSelect(e.target.files[0], label)}
        />
      </button>
    </div>
  );
};

export default FileUpload;