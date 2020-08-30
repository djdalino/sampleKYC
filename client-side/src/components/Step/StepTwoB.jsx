import React, { useContext, useRef, useState } from "react";
import HeaderContext from "../../context/HeaderContext";
// import CropImage from "../CropImage/Index";
import CamPlus from "../../Images/camPlus.png";
import Upload from "../../Images/upload.png";
import IdWithFace from "../../Images/withID.png";
import loadImage from "blueimp-load-image/js";
import axios from "axios";
import LoadingPage from "../Common/LoadingPage";
import { calculatePercent } from "../Common/Calculate";
const StepTwo = () => {
  const { setPercent } = useContext(HeaderContext);
  const { setIsLoading } = useContext(HeaderContext);
  const { stepTwoUploadB, setStepTwoUploadB } = useContext(HeaderContext);
  const [stepTwoFileUploadB, setStepTwoFileUploadB] = useState([]);
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
      setStepTwoFileUploadB([...stepTwoFileUploadB, e.target.files[0]]);
      // const reader = new FileReader();
      // reader.addEventListener('load', () =>
      //   this.setState({ src: reader.result })
      // );
      // reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitFile = async () => {
    if (stepTwoUploadB.length === 0) {
      alert("Please input image");
    } else if (stepTwoUploadB.length < 2) {
      alert("Upload 1 more image");
    } else if (stepTwoUploadB.length > 2) {
      alert("Choose 2 images only");
    } else {
      // alert("Image uploaded");
      // setCount(count + 1);
      setIsLoading(true);

      try {
        const STRAPI_BASE_URL = "https://minikyc.herokuapp.com";
        const LOCAL_BASE_URL = "http://localhost:1337";
        const data = new FormData();

        stepTwoFileUploadB.forEach(async item => {
          data.append("files", item);
        });
        await axios.post(`${STRAPI_BASE_URL}/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: progress =>
            setPercent(calculatePercent(progress.loaded, progress.total))
        });

        setIsLoading(false);
        alert("Image uploaded");
        setPercent(0);
        setCount(count + 1);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };
  const deleteItem = id => {
    const findOne = stepTwoUploadB.map(d => d);
    // const deleteOne = upload.filter(d => d);
    setStepTwoUploadB(stepTwoUploadB.filter(d => d !== findOne[id]));
  };
  return (
    <React.Fragment>
      <LoadingPage />
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
          <strong>Succesfully added photo!</strong> Add 1 more
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
      <div className="d-flex justify-content-center mb-2">
        {stepTwoUploadB.slice(0, 2).map((item, id) => {
          return (
            <div
              key={id}
              className="text-center d-flex align-items-center justify-content-center"
              style={{ height: "100px", width: "120px" }}
            >
              <img
                src={item}
                alt="crop"
                className="step-img-fluid"
                height="100"
                width="100"
              />
            </div>
          );
        })}
      </div>
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

      <div className="text-center mb-5">
        <button
          onClick={() => onSubmitFile()}
          className="btn btn-danger py-3 px-5"
          style={{ fontSize: "24px" }}
        >
          <img
            className="mr-4 pb-1"
            style={{ height: "30px" }}
            src={Upload}
            alt="upload"
          />
          Send Photo
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepTwo;
