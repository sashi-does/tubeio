import React, { useContext } from "react";
import { Search, X } from "heroicons-react";
import Context from "../context/Context";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const Context = useContext(Context);

    const onChangeSearch = (e) => {
      setSearch(e.target.value);
    };

  return (
    <Context.Provider>
        {
            value => {
                const { searchValue } = value;
            }
        }
    </Context.Provider>
  );
};

export default SearchBar;
