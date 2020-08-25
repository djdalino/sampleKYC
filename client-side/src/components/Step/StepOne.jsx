import React, { useState, useRef } from "react";
import Human from "../../Images/human.png";
const StepOne = () => {
  const [upload, setUpload] = useState(null);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  console.log(upload);
  const onSubmitFile = () => {
    alert("Image uploaded");
  };
  return (
    <React.Fragment>
      <p className="text-center">Top of your head</p>
      <div
        className="border position-relative mx-auto box-h300 box-w300"
        onClick={handleInputFile}
      >
        <div className="position-absolute border-inner-box box-h310 box-w150"></div>
        <div className="position-absolute box-img w-75">
          <img
            src={upload ? upload : Human}
            alt="Your Selfie"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <p className="text-center">End of your torso</p>

      <div className="my-3 text-center">
        <p>1. Keep a neutral face (no smiling)</p>
        <p>2. Make sure your in focus</p>
        <p>3. Follow guideline below</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={e => setUpload(URL.createObjectURL(e.target.files[0]))}
        style={{ display: "none" }}
        accept="image/*"
        capture=""
      />

      <div className="text-center">
        <button onClick={() => onSubmitFile()} className="btn btn-danger">
          Send Photo
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepOne;
