import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
export const DataContext = createContext();
 const DataProvider = ({children}) => {
    const initialState = {
      notify: {},
      auth: {},
      modal: [],
      services: [],
      users: [],
      doctors: [],
      usefuls: [],
      reviews: [],
    };

    const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;