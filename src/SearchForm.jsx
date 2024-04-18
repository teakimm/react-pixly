import { useState, useEffect } from "react";
import { debounce } from "lodash";

const INITIAL_DATA = {
  searchTerm: "",
  category: "",
};

function SearchForm({ handleSearch }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  console.log("in rendering SearchForm");

  const debounceLiveSearch = debounce(() => {
    handleSearch(formData);
  }, 1000);

  useEffect(
    function liveSearchOnInputChange() {
      console.log("in useEffect SearchForm");
      debounceLiveSearch();
    },
    [formData]
  );

  /** Set inputValue. */
  function handleChange(evt) {
    setFormData((data) => ({
      ...data,
      [evt.target.name]: evt.target.value,
    }));
    debounceLiveSearch.cancel();
  }

  /** Call parent handleSearch function. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(formData);
    debounceLiveSearch.cancel();
  }

  const formIsValid = Object.values(formData).every((v) => v !== "");

  return (
    <div className="SearchForm col-10">
      <form onSubmit={handleSubmit}>
        <select
          name="category"
          id="searchByCategory"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="">Select category to filter by</option>
          <option value="name">Name</option>
          <option value="state">State</option>
          <option value="model">Camera model</option>
        </select>
        <div className="input-group">
          <input
            type="text"
            name="searchTerm"
            value={formData.searchTerm}
            onChange={handleChange}
            placeholder="Enter Search Term..."
            className="SearchForm-input form-control"
          />
          <label htmlFor="searchByCategory"></label>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formIsValid}
          >
            <span className="bi bi-search"></span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
