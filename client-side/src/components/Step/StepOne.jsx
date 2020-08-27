import React, { useContext, useRef } from "react";
import Step from "../Common/Step";
import Human from "../../Images/human.png";
import HeaderContext from "../../context/HeaderContext";
import ExifOrientationImg from "react-exif-orientation-img";
import loadImage from "blueimp-load-image/js";
const StepOne = () => {
  const { stepOneUpload, setStepOneUpload } = useContext(HeaderContext);
  const { count, setCount } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      loadImage(
        e.target.files[0],
        setStepOneUpload(URL.createObjectURL(e.target.files[0])),
        { orientation: true }
      );

      // const reader = new FileReader();
      // reader.addEventListener('load', () =>
      //   this.setState({ src: reader.result })
      // );
      // reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitFile = () => {
    if (!stepOneUpload) {
      alert("Please input image");
    } else {
      alert("Image uploaded");
      setCount(count + 1);
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
          <ExifOrientationImg
            crossOrigin="anonymous"
            src={stepOneUpload ? stepOneUpload : Human}
            alt="Selfie"
            height="100%"
            width="100%"
          />
          {/* <img
            src={stepOneUpload ? stepOneUpload : Human}
            alt="Your Selfie"
            height="100%"
            width="100%"
          /> */}
        </div>
      </div>
      <p className="text-center">End of your torso</p>

      <div className="my-3 text-center text-warning">
        <p>1. Keep a neutral face (no smiling)</p>
        <p>2. Make sure your in focus</p>
        <p>3. Follow guideline below</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={onSelectFile}
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
