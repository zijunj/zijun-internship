import React from "react";

const Skeleton = ({
  width,
  height,
  borderRadius = "8px",
  margin,
  className = "",
}) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width,
        height,
        borderRadius,
        margin,
      }}
    ></div>
  );
};

export default Skeleton;
