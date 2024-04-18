import { useState, useEffect } from "react";
import { debounce } from "lodash";

function SearchForm({ handleSearch }) {
    const [inputValue, setInputValue] = useState("");
    console.log("in rendering SearchForm");

    const debounceLiveSearch = debounce(() => {
        handleSearch(inputValue);
    }, 1000);

    useEffect(function liveSearchOnInputChange() {
        console.log("in useEffect SearchForm");
        debounceLiveSearch();
    }, [inputValue]);

    /** Set inputValue. */
    function handleChange(evt) {
        setInputValue(evt.target.value);
        debounceLiveSearch.cancel();
    }


    /** Call parent handleSearch function. */
    function handleSubmit(evt) {
        evt.preventDefault();
        handleSearch(inputValue);
        setInputValue(inputValue.trim());
        debounceLiveSearch.cancel();
    }

    return (
        <div className="SearchForm col-10">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter Search Term..."
                        className="SearchForm-input form-control" />
                    <button type="submit" className="btn btn-primary">
                        <span className="bi bi-search"></span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;