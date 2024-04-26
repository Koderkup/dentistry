import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";
import { typography } from "@/utils/typography";
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    modal: {},
    services: [],
    subservices: [],
    subservice_directions: [],
    users: [],
    doctors: [],
    articles: [],
    filtered_articles: [],
    actions: [],
    reviews: [],
    widgets: [],
    prices: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth } = state;
  const {
    SPECIALIZATION_1,
    SPECIALIZATION_2,
    SPECIALIZATION_3,
    SPECIALIZATION_4,
  } = typography;
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
    getData("articles").then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { error: res.err } });
      } else {
        dispatch({ type: "ADD_ARTICLE", payload: res.articles });
        const filteredArticles = res.articles.filter((article) => {
          if (
            article.header === SPECIALIZATION_1 ||
            article.header === SPECIALIZATION_2 ||
            article.header === SPECIALIZATION_3 ||
            article.header === SPECIALIZATION_4
          ) {
            return article;
          }
        });
        dispatch({ type: "ADD_FILTERED_ARTICLE", payload: filteredArticles });
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
