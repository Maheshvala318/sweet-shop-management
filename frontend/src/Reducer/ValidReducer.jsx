export default function ValidReducer(state, action) {
  switch (action.type) {
    case "updateStatus":
      return {
        ...state,
        status: action.payload // Expects "login" or "logout" exactly
      };

    case "updateShowNav":
      return {
        ...state,
        showNav: action.payload !== "login"
      };

    case "updateData":
      const payload = action.payload || {};
      return {
        ...state,
        data: {
          name: payload.name || "",
          email: payload.email || "",
          fullname: payload.name ? `Welcome, ${payload.name}` : "",
          id: payload.id || state.data.id
        }
      };

    default:
      return state;
  }
}