import React from "react";

export const Loading = React.memo(() => {
  return (
    <div className="row mt-5 text-center bg-white p-5 mb-3">
      <h3 className="text-secondary text-center w-100">LOADING...</h3>
      <div className="col-12 d-block text-center">
        <img src={"/assets/images/spinner.svg"} alt="Loading..." />
      </div>
    </div>
  );
});
