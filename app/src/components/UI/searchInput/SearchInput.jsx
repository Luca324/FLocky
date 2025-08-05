import MyInput from "@/components/UI/input/MyInput.jsx";
import cross from "@/img/cross.svg";
import { useEffect, useState, useRef } from "react";
import { fuzzyFilter } from "@/utils/fuzzyFilter.js";

function SearchInput({ searchData, showResult,getValForFilter,...props }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    searchForChats();
  }, [searchQuery]); // поиск осуществляется сразу при изменении searchQuery

  const searchForChats = () => {
    if (searchQuery.trim()) {
      const searchResult = fuzzyFilter(searchData, searchQuery.trim(), getValForFilter, 0);
      showResult(searchResult);
    } else {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    showResult(searchData);
  };

  return (
    <MyInput
      {...props}
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
    >
      <button
        className="clear-input"
        onClick={() => {
            clearSearch();
        }}
      >
        <img className="clear-input-img" src={cross} alt="" />
      </button>
    </MyInput>
  );
}

export default SearchInput;
