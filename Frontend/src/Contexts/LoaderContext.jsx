import { createContext, useState, useContext } from "react";
const loaderContext = createContext();
function LoaderContext({ children }) {
  let [showLoader, setShowLoader] = useState(false);
  return (
    <loaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </loaderContext.Provider>
  );
}
export let useLoader = () => {
  return useContext(loaderContext);
};
export default LoaderContext;
