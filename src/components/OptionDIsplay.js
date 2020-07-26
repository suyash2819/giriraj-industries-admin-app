import React from "react";

const OptionDisplay = (props) => {
  const { data } = props;
  return (
    <>
      {data.map((item, index) => (
        <>
          <option key={index}>{item}</option>
        </>
      ))}
    </>
  );
};

export default OptionDisplay;
