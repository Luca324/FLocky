import MyInput from "../input/MyInput";
import cross from "../../../img/cross.svg";
import { useEffect, useState, useRef } from "react";
import { fuzzyFilter } from "../../../utils/fuzzyFilter";

function SearchInput({ searchData, showResult,getValForFilter,...props }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    searchForChats();
  }, [searchQuery]); // поиск осуществляется сразу при изменении searchQuery

  const searchForChats = () => {
    console.log('searchQuery', searchQuery)
    console.log('searchData',searchData)
    if (searchQuery.trim()) {
      const searchResult = fuzzyFilter(searchData, searchQuery.trim(), getValForFilter, 0);
      console.log('searchResult',searchResult)
      showResult(searchResult);
    } else {
      console.log("empty");
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
          console.log("cleaning search...");
            clearSearch();
        }}
      >
        <img className="clear-input-img" src={cross} alt="" />
      </button>
    </MyInput>
  );
}

export default SearchInput;
