export default function ValidReducer(state, action) {
  switch (action.type) {
    case "updateStatus":
      return {
        ...state,
        status: action.payload === "login" ? "Logout" : "Login"
      };

    case "updateShowNav":
      return {
        ...state,
        showNav: action.payload !== "login"
      };

    case "updateData":
      // Safely handle undefined payload or missing properties
      const payload = action.payload || {};
      const { name = "", email = "", id = null } = payload;
      
      return {
        ...state,
        data: {
          name,
          email,
          fullname: name ? `Welcome, ${name}` : "",
          id: id || state.data.id // Fall back to existing ID if not provided
        }
      };

    default:
      return state;
  }
}