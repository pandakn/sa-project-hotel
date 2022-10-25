// import React, { useState } from "react";
function UploadFile() {
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<any> => {

    const files = event.target.files;
    if (!event.target.files || event.target.files.length === 0) {
      console.error("Select a file");
      return;
    }
    const fileLoaded = URL.createObjectURL(event.target.files[0]);
    console.log("files: ", files);
    const dimensions = await someFunction(fileLoaded);
    console.log("dimensions: ", dimensions);
  };
  const getHeightAndWidthFromDataUrl = (dataURL: string) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
      };
      img.src = dataURL;
    });
  // Get dimensions
  const someFunction = async (file: any) => {
    console.log("file: ", file);
    const dimensions = await getHeightAndWidthFromDataUrl(file);
    return dimensions;
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        accept="image/jpg,.gif,.png,.svg,.webp audio/wav,.mp3"
      />
    </div>
  );
}
export default UploadFile;
