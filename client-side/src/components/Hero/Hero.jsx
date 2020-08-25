import React from "react";

const Hero = ({ data }) => {
  return (
    <div className="mt-5">
      <div className="w-100 px-5 py-4 mt-2 bg-primary text-white">
        <h2 className="text-center box-w300 mx-auto">{data}</h2>
      </div>
    </div>
  );
};

export default Hero;
