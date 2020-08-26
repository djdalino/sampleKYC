import HeaderContext from "./HeaderContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [upload, setUpload] = useState([]);
  const [stepOneUpload, setStepOneUpload] = useState(null);
  let [imageRef] = useState(null);
  let [fileUrl] = useState(null);
  return (
    <HeaderContext.Provider
      value={{
        src,
        setSrc,
        crop,
        setCrop,
        upload,
        setUpload,
        stepOneUpload,
        setStepOneUpload,
        croppedImageUrl,
        setCroppedImageUrl,
        imageRef,
        fileUrl
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export default ContextWrapper;
