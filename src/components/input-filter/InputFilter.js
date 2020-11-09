import React, { useEffect, useState } from "react";

export const InputFilter = ({ onFilter, filterByOptions }) => {
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => setFilterBy(filterByOptions[0]), [
    setFilterBy,
    filterByOptions,
  ]);

  const handleFilter = (event) => {
    onFilter(filterBy, event.target.value);
  };

  return (
    <section className="row">
      <article className="col-12">
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="form-group">
            <label htmlFor="filter-by">Search By</label>
            <select
              onChange={(event) => setFilterBy(event.target.value)}
              className="form-control ml-3"
              id="filter-by"
            >
              {filterByOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <input
            className="form-control ml-3 mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={handleFilter}
          />
        </form>
      </article>
    </section>
  );
};
