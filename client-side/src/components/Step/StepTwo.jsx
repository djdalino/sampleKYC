import React, { useContext, useRef } from "react";
import HeaderContext from "../../context/HeaderContext";
// import CropImage from "../CropImage/Index";
import Step from "../Common/Step";
import Card from "../../Images/card.png";
import Upload from "../../Images/upload.png";
// import loadImage from "blueimp-load-image/js";
import LoadingPage from "../Common/LoadingPage";
import { calculatePercent } from "../Common/Calculate";
import axios from "axios";
const StepTwo = () => {
  const { setPercent } = useContext(HeaderContext);
  const { setIsLoading } = useContext(HeaderContext);
  const { upload, setUpload } = useContext(HeaderContext);
  const { setSrc } = useContext(HeaderContext);
  const { setCrop } = useContext(HeaderContext);
  const { count, setCount } = useContext(HeaderContext);
  const { stepTwoFileUpload } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const handleFileOnChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitFile = async () => {
    if (upload.length === 0) {
      alert("Please input image");
    } else if (upload.length < 2) {
      alert("Upload 1 more image");
    } else if (upload.length > 2) {
      alert("Choose 2 images only");
    } else {
      setIsLoading(true);
      setCrop({
        unit: "px", // default, can be 'px' or '%'
        x: 15,
        y: 15,
        width: 50,
        height: 50
      });
      try {
        const STRAPI_BASE_URL = "https://minikyc.herokuapp.com";

        const data = new FormData();

        stepTwoFileUpload.forEach(async item => {
          data.append("files", item);
        });
        await axios.post(`${STRAPI_BASE_URL}/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: progress =>
            setPercent(calculatePercent(progress.loaded, progress.total))
        });

        alert("Image uploaded");
        setIsLoading(false);
        setPercent(0);
        setCount(count + 1);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };
  const deleteItem = id => {
    const findOne = upload.map(d => d);
    // const deleteOne = upload.filter(d => d);
    setUpload(upload.filter(d => d !== findOne[id]));
    setSrc(null);
  };
  return (
    <React.Fragment>
      <LoadingPage />
      <Step step="Step 2" data="Take a Photo of 2 valid id" />
      {upload.length === 1 ? (
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
      ) : upload.length >= 2 ? (
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

      <div className="mb-5">
        <p
          className="text-center"
          style={{ color: "grey", fontSize: "14px", fontWeight: "700" }}
        >
          2 valid ids should be one of those:
        </p>

        <p
          className="text-center"
          style={{ color: "grey", fontSize: "14px", fontWeight: "300" }}
        >
          Driver's License, Voter's ID, Passport, SSS ID
        </p>
      </div>
      <p className="text-center mb-1">Choose 2 images only {upload.length}/2</p>
      <div className="d-flex justify-content-center ">
        {upload.slice(0, 2).map((item, id) => {
          return (
            <div
              key={id}
              className="text-center d-flex align-items-center"
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
      <div className="border position-relative mx-auto box-h200 box-w300">
        <div className="position-absolute border-inner-box box-h210 box-w225"></div>
        <div className="position-absolute box-img w-90 h-100 py-10">
          {upload.length < 1 ? (
            <img
              src={Card}
              alt="Your Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          ) : (
            <div className="position-relative h-178">
              <button
                className="close position-absolute"
                style={{
                  top: "-20px",
                  right: "-10px",
                  color: "red",
                  zIndex: "100px"
                }}
                aria-label="Close"
                onClick={() => deleteItem(upload.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <img
                className="img-fluid"
                src={upload[upload.length - 1]}
                alt="Your Selfie"
                height="100%"
                width="100%"
                onClick={handleInputFile}
                disabled={upload > 2 ? true : false}
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <p>1. One photo per ID</p>
        <p>2. Take the photo as close as possible</p>
        <p>3. Make sure your in focus</p>
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
