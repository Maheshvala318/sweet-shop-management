export default function FilterReducer(state, action) {
  switch (action.type) {
    case "filterSweets":
      return {
        ...state,
        filterSweets: [...action.payload],
        allSweets: [...action.payload],
      };

    case "updateFilter":
      let { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "updateFilterSweets":
      const { allSweets } = state;
      let tempSweets = [...allSweets];
      let { text, category } = state.filters;
      if (text) {
        tempSweets = tempSweets.filter((value) =>
          value.name.toLowerCase().includes(text)
        );
      }
      if (category !== "All") {
        tempSweets = tempSweets.filter((value) => value.category === category);
      }
      return {
        ...state,
        filterSweets: tempSweets,
      };

    case "iconUpdateFilter":
      let val = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          category: val,
        },
      };

    default:
      return state;
  }
}
