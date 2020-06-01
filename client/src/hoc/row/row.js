import React from "react";

function Row({ left, right }) {
  return (
    <div className="row">
      <div className="col-lg-4">{left}</div>
      <div className="col-lg-8">{right}</div>
    </div>
  );
}

export default Row;
