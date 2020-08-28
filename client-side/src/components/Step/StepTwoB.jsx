import React, { useContext, useRef } from "react";
import HeaderContext from "../../context/HeaderContext";
// import CropImage from "../CropImage/Index";
import CamPlus from "../../Images/camPlus.png";
import IdWithFace from "../../Images/withID.png";
import loadImage from "blueimp-load-image/js";
const StepTwo = () => {
  const { stepTwoUploadB, setStepTwoUploadB } = useContext(HeaderContext);
  const { count, setCount } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const handleFileOnChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      loadImage(
        e.target.files[0],
        setStepTwoUploadB([
          ...stepTwoUploadB,
          URL.createObjectURL(e.target.files[0])
        ]),
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
    if (stepTwoUploadB.length === 0) {
      alert("Please input image");
    } else if (stepTwoUploadB.length < 2) {
      alert("Upload 1 more image");
    } else if (stepTwoUploadB.length > 2) {
      alert("Choose 2 images only");
    } else {
      alert("Image uploaded");
      setCount(count + 1);
    }
  };
  const deleteItem = id => {
    const findOne = stepTwoUploadB.map(d => d);
    // const deleteOne = upload.filter(d => d);
    setStepTwoUploadB(stepTwoUploadB.filter(d => d !== findOne[id]));
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center my-3 mb-4 px-2">
        <div className="px-1">
          <img src={CamPlus} alt="Cam Plus" height="22" width="22" />
        </div>
        <h5
          className="px-1 m-0"
          style={{ color: "#3b5cf6", width: "6.5rem", fontSize: "20px" }}
        >
          Step 2
        </h5>
        <h5
          className="px-1 m-0"
          style={{ color: "grey", fontSize: "20px", width: "auto" }}
        >
          Take a Selfie with the 2 valid IDs one by one
        </h5>
      </div>
      {stepTwoUploadB.length === 1 ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Succesfully added photo!</strong> upload 1 more
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : stepTwoUploadB.length >= 2 ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Succesfully added photos!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}

      <p className="text-center mb-1">
        Choose 2 images only {stepTwoUploadB.length}/2
      </p>
      <div className="border position-relative mx-auto box-h300 box-w300">
        <div className="position-absolute border-inner-box box-h310 box-w225"></div>
        <div className="position-absolute box-img w-90 h-100 py-10">
          {stepTwoUploadB.length < 1 ? (
            <img
              src={IdWithFace}
              alt="Your Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          ) : (
            <div className="position-relative h-100">
              <button
                className="close position-absolute"
                style={{
                  top: "-20px",
                  right: "-10px",
                  color: "red",
                  zIndex: "100px"
                }}
                aria-label="Close"
                onClick={() => deleteItem(stepTwoUploadB.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <img
                className="img-fluid-step-two-b "
                src={stepTwoUploadB[stepTwoUploadB.length - 1]}
                alt="Your Selfie"
                height="100%"
                width="100%"
                onClick={handleInputFile}
                disabled={stepTwoUploadB > 2 ? true : false}
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <p>1. One photo per ID</p>
        <p>2. Make sure your in focus</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={handleFileOnChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      <div className="text-center">
        <button onClick={() => onSubmitFile()} className="btn btn-danger">
          Send Photo
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepTwo;
