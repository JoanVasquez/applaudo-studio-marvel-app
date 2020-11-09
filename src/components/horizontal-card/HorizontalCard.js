import React from "react";
import moment from "moment";

export const HorizontalCard = ({ image, description, modified }) => {
  const modifiedDate = moment(modified).format("YYYY-MM-DD").toString();
  return (
    <div className="card mb-3 p-2" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        <div className="col-md-12">
          <img
            src={image ? image : "/assets/images/no-image.png"}
            className="card-img"
            alt="Character"
          />
        </div>
        <div className="col-md-12 mt-3">
          <div className="card-body pt-0">
            <h5 className="card-title">Description</h5>
            <p className="card-text">
              {description ? (
                description
              ) : (
                <span className="text-danger">No description available</span>
              )}
            </p>
            <p className="card-text">
              Modified Date:{" "}
              <small className="text-muted">{modifiedDate}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
