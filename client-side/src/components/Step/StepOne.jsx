import React, { useContext, useRef } from "react";
import Step from "../Common/Step";
import Human from "../../Images/human.png";
import HeaderContext from "../../context/HeaderContext";
const StepOne = () => {
  const { stepOneUpload, setStepOneUpload } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  console.log(stepOneUpload);
  const onSubmitFile = () => {
    if (!stepOneUpload) {
      alert("Please input image");
    } else {
      alert("Image uploaded");
    }
  };

  return (
    <React.Fragment>
      <Step step="Step 1" data="take a selfie" />
      <p className="text-center">Top of your head</p>
      <div
        className="border position-relative mx-auto box-h300 box-w300"
        onClick={handleInputFile}
      >
        <div className="position-absolute border-inner-box box-h310 box-w225"></div>
        <div className="position-absolute box-img w-75 py-10">
          <img
            src={stepOneUpload ? stepOneUpload : Human}
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
        onChange={e => setStepOneUpload(URL.createObjectURL(e.target.files[0]))}
        style={{ display: "none" }}
        accept="image/*"
        capture
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
