import React from "react";
import { Loading } from "../../components/loading/Loading";
import { Alert } from "../../components/alert/Alert";

export const StoriesWrapper = ({ children, isLoading, errors }) => {
  return (
    <article className="container mt-3">
      {errors && (
        <div className="row">
          <div className="col-12">
            <Alert type="alert-danger" className="mt-3" message={errors} />
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="row">
          <div className="col-12">
            <Loading />
          </div>
        </div>
      ) : (
        children
      )}
    </article>
  );
};
