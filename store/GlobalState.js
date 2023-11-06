import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
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

    useEffect(() => {
      const firstLogin = localStorage.getItem("firstLogin");
      if (firstLogin) {
        getData("auth/accessToken").then((res) => {
          if (res.err) return localStorage.removeItem("firstLogin");
          dispatch({
            type: "AUTH",
            payload: {
              token: res.access_token,
              user: res.user,
            },
          });
        });
      }
    }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;