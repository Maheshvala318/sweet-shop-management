import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "../Components/ErrorPage";

const SweetContext = createContext();

const SweetContextProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/sweets/")
      .then((res) => setSweets(res.data))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <SweetContext.Provider value={sweets}>
      {children}
    </SweetContext.Provider>
  );
};

const useSweet = () => {
  return useContext(SweetContext);
};

export { SweetContext, SweetContextProvider, useSweet };
