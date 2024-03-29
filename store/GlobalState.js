import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    modal: {},
    services: [],
    users: [],
    doctors: [],
    articles: [],
    actions: [],
    reviews: [],
    widgets: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth } = state;
  
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

  useEffect(() => {
    if (auth.token) {
      if (auth.user.role === "admin") {
        getData("user", auth.token).then((res) => {
          if (res.err)
            dispatch({ type: "NOTIFY", payload: { error: res.err } });

          dispatch({
            type: "ADD_USER",
            payload: [...res],
          });
        });
      } else {
        dispatch({ type: "ADD_USER", payload: [] });
      }
    }
  }, [auth.token, auth.user]);

  useEffect(() => {
    // Получение данных статей из базы данных
    getData("articles").then((res) => {
      if (res.err) {
        // Обработка ошибки, если не удалось получить данные
        dispatch({ type: "NOTIFY", payload: { error: res.err } });
      } else {
        // Обновление состояния с полученными данными статей
        dispatch({ type: "ADD_ARTICLES", payload: res.articles });
      }
    });
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
