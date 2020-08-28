import React, { useContext, useRef } from "react";
import Human from "../../Images/docsWithID.png";
import Camera from "../../Images/camera.png";
import HeaderContext from "../../context/HeaderContext";
import ExifOrientationImg from "react-exif-orientation-img";
import ReactPlayer from "react-player";

const StepOne = () => {
  const { stepThreeUpload, setStepThreeUpload } = useContext(HeaderContext);

  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      setStepThreeUpload(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onSubmitFile = () => {
    if (stepThreeUpload === null) {
      alert("Please input image");
    } else {
      alert("Video uploaded");
    }
  };
  const deleteItem = () => {
    setStepThreeUpload(null);
  };
  return (
    <React.Fragment>
      {stepThreeUpload ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Succesfully added video!</strong>
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
      <p
        className="text-center mt-3 px-2"
        style={{ color: "grey", fontSize: "14px", fontWeight: "700" }}
      >
        Take Video With the ID In your right hand and a A4 paper in the left
        hand and write down in the middle of the paper
      </p>
      <div className="border mt-5 position-relative mx-auto box-h300 box-w300">
        <div className="position-absolute border-inner-box box-h310 box-w225"></div>
        <div className="position-absolute box-img w-75 py-10">
          {stepThreeUpload ? (
            <div className="position-relative">
              <button
                className="close position-absolute"
                style={{
                  top: "-20px",
                  right: "-10px",
                  color: "red",
                  zIndex: "100px"
                }}
                aria-label="Close"
                onClick={() => deleteItem(stepThreeUpload.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <ReactPlayer
                controls
                playing
                height="100%"
                width="100%"
                url={stepThreeUpload}
                onDuration={console.log("duration")}
              />
            </div>
          ) : (
            <ExifOrientationImg
              crossOrigin="anonymous"
              src={Human}
              alt="Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          )}
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <img src={Camera} alt="camera" onClick={handleInputFile} />
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={onSelectFile}
        style={{ display: "none" }}
        accept="video/*"
      />

      <div className="text-center mb-5">
        <button onClick={() => onSubmitFile()} className="btn btn-danger">
          Send video
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepOne;
