import { createContext, useContext, useReducer, useMemo } from "react";
import reducer from "../Reducer/ValidReducer";

const ValidContext = createContext();

const initialState = {
  status: "Login",
  showNav: true,
  data: {
    name: "",
    email: "",
    fullname: "",
    id: null
  }
};

const ValidContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Safe dispatch functions
  const updateStatus = (status) => {
    if (typeof status !== 'string') {
      console.error("updateStatus expects a string parameter");
      return;
    }
    dispatch({ type: "updateStatus", payload: status });
  };

  const updateShowNav = (status) => {
    if (typeof status !== 'string') {
      console.error("updateShowNav expects a string parameter");
      return;
    }
    dispatch({ type: "updateShowNav", payload: status });
  };

 const updateData = (obj) => {
  // Ensure we always have all required fields
  const payload = {
    id: null,
    name: '',
    email: '',
    ...(obj || {})
  };
  
  dispatch({ 
    type: "updateData", 
    payload: {
      id: payload.id || payload.user_id,  // Handle both id and user_id
      name: payload.name,
      email: payload.email
    }
  });
};

  const contextValue = useMemo(() => ({
    ...state,
    updateStatus,
    updateShowNav,
    updateData
  }), [state]);

  return (
    <ValidContext.Provider value={contextValue}>
      {children}
    </ValidContext.Provider>
  );
};

const useValid = () => {
  const context = useContext(ValidContext);
  if (!context) {
    throw new Error('useValid must be used within a ValidContextProvider');
  }
  return context;
};

export { ValidContextProvider, useValid };