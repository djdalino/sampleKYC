import HeaderContext from "./HeaderContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
  const [count, setCount] = useState(0);
  const [src, setSrc] = useState(null);
  const [srcStepTwoB, setSrcStepTwoB] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px", // default, can be 'px' or '%'
    x: 15,
    y: 15,
    width: 50,
    height: 50
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [upload, setUpload] = useState([]);
  const [stepOneUpload, setStepOneUpload] = useState(null);
  const [stepTwoUploadB, setStepTwoUploadB] = useState([]);
  let [imageRef] = useState(null);
  let [fileUrl] = useState(null);
  return (
    <HeaderContext.Provider
      value={{
        count,
        setCount,
        src,
        setSrc,
        srcStepTwoB,
        setSrcStepTwoB,
        crop,
        setCrop,
        upload,
        setUpload,
        stepOneUpload,
        setStepOneUpload,
        stepTwoUploadB,
        setStepTwoUploadB,
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
