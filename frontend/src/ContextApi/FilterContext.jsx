import { createContext, useContext, useEffect, useReducer } from "react";
import { useSweet } from "./SweetsContext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filterSweets: [],
  allSweets: [],
  featureSweets: [],
  filters: {
    text: "",
    category: "All",
  },
};

const FilterContextProvider = ({ children }) => {
  const sweets = useSweet();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "updateFilterSweets" });
  }, [state.filters]);

  useEffect(() => {
    const featured = sweets.filter((item) => item.feature);
    state.featureSweets = featured;

    dispatch({
      type: "filterSweets",
      payload: sweets,
    });
  }, [sweets]);

  const updateFilter = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "updateFilter", payload: { name, value } });
  };

  const iconUpdateFilter = (val) => {
    dispatch({ type: "iconUpdateFilter", payload: val });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, updateFilter, iconUpdateFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterContext, FilterContextProvider, useFilter };
