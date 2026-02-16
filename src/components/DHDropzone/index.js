/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2026 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DHDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Destructure the properties you need
  const { onClick, onKeyDown } = getRootProps();
  const { onChange } = getInputProps();

  return (
    <div onClick={onClick} onKeyDown={onKeyDown}>
      <input onChange={onChange} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
}

export default DHDropzone;
