/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2026 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Dropzone, FileMosaic, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";

function DHDropzone() {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <Dropzone onChange={updateFiles} value={files} maxFiles={10} maxFileSize={2998000}>
      {files.map((file, i) => (
        <FileMosaic key={i} {...file} onDelete={onDelete} onSee={handleSee} preview info hd />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e) => handleSee(undefined)}
      />
    </Dropzone>
  );
}

export default DHDropzone;
