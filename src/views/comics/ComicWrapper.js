import React from "react";
import { ToastContainer } from "react-toastify";
import { Alert } from "../../components/alert/Alert";
import { InputFilter } from "../../components/input-filter/InputFilter";
import { Loading } from "../../components/loading/Loading";

export const ComicWrapper = ({ errors, onFilter, isLoading, children }) => {
  return (
    <article className="container">
      <ToastContainer />
      <h2 className="mt-3">COMICS</h2>
      <InputFilter
        onFilter={onFilter}
        filterByOptions={["title", "format", "issueNumber"]}
      />
      {errors.length > 0 && (
        <div className="mt-3">
          <Alert type="alert-danger" className="mt-3" message={errors} />
        </div>
      )}
      <section className="row">
        {isLoading ? (
          <div className="col-12 text-center">
            <Loading />
          </div>
        ) : (
          children
        )}
      </section>
    </article>
  );
};
