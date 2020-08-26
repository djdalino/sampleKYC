import React, { useState, useRef } from "react";
import Step from "../Common/Step";
import Card from "../../Images/card.png";
const StepOne = () => {
  const [upload, setUpload] = useState([]);
  //   const [count, setCount] = useState(0);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };

  const handleFileOnChange = e => {
    setUpload([...upload, URL.createObjectURL(e.target.files[0])]);
    setCount(e.target.files.length);
  };
  console.log(upload);
  const onSubmitFile = () => {
    if (upload.length === 0) {
      alert("Please input image");
    } else if (upload.length < 2) {
      alert("Upload 1 more image");
    } else if (upload.length > 2) {
      alert("Choose 2 images only");
    } else {
      alert("Image uploaded");
    }
  };
  const deleteItem = id => {
    const findOne = upload.map(d => d);
    console.log(findOne[id]);
    const deleteOne = upload.filter(d => d);
    setUpload(upload.filter(d => d !== findOne[id]));
    console.log(`delete: ${deleteOne[id]}`);
  };
  return (
    <React.Fragment>
      <Step step="Step 2" data="Take a Photo of 2 valid id" />
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
      <p className="text-center"> Choose 2 images only {upload.length}/2</p>
      <div className="border position-relative mx-auto box-h200 box-w300">
        <div className="position-absolute border-inner-box box-h210 box-w225"></div>
        <div className="position-absolute box-img w-90 py-10">
          {upload.length < 1 ? (
            <img
              src={Card}
              alt="Your Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          ) : (
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
                onClick={() => deleteItem(upload.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <img
                src={upload[upload.length - 1]}
                alt="Your Selfie"
                height="100%"
                width="100%"
                onClick={handleInputFile}
              />
            </div>
          )}
          {/* <img
            src={upload.length < 1 ? Card : upload[upload.length - 1]}
            alt="Your Selfie"
            height="100%"
            width="100%"
          /> */}
        </div>
      </div>

      <div className="my-3 text-center">
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