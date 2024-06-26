import React from "react";
import CreateContentManager from "../pages/create-widget/index";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { DataContext } from "../store/GlobalState";

const mockedState = {
  notify: {},
  auth: {
    user: { name: "user", role: "admin", email: "email@mail.com" },
    token: "test-token",
  },
  modal: {},
  services: [],
  users: [],
  doctors: [],
  articles: [],
  filtered_articles: [],
  actions: [],
  reviews: [],
  widgets: [
    { type: "type1", title: "title1", widgetURL: "https//mockedUrl1" },
    { type: "type2", title: "title2", widgetURL: "https//mockedUrl2" },
  ],
};

jest.mock("../utils/fetchData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      widgets: [
        { type: "type1", title: "title1", widgetURL: "https//mockedUrl1" },
        { type: "type2", title: "title2", widgetURL: "https//mockedUrl2" },
      ],
    })
  ),
  postData: jest.fn(() =>
    Promise.resolve({
      success: "Mock success message",
    })
  ),
}));
const mockedDispatch = jest.fn();
jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockedState,
  dispatch: mockedDispatch,
}));
describe("CreateContentManager", () => {
  it("it should renders correctly", () => {
    render(
      <DataContext.Provider
        value={{ state: mockedState, dispatch: mockedDispatch }}
      >
        <CreateContentManager />
      </DataContext.Provider>
    );
    const titleInput = screen.getByPlaceholderText('Название');
    const categoryInput = screen.getByTestId('select');
    const urlInput = screen.getByPlaceholderText("ссылка на облако https://postimg.cc/");
    expect(screen.getByText("Название")).toBeInTheDocument();
    expect(screen.getByText("выберите категорию")).toBeInTheDocument();
    expect(screen.getByText("URL адрес")).toBeInTheDocument();
    expect(screen.getByText("Тип")).toBeInTheDocument();
    expect(screen.getByText("Создать")).toBeInTheDocument();
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "NOTIFY",
      payload: { error: "Пожалуйста запоните все поля." },
    });

    fireEvent.change(categoryInput, {
      target: { name: "type", value: "type-input" },
    });
    fireEvent.change(titleInput, {
      target: { name: "title", value: "mock-title" },
    });
    fireEvent.change(urlInput, {
      target: { name: "widgetURL", value: "https://mocked-widgetURL" },
    });
    fireEvent.submit(form);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "NOTIFY",
      payload: { success: "Mock success message" },
      type: "NOTIFY", payload: {} 
    });
    expect(mockedDispatch).toHaveBeenCalledTimes(5);
  });
});
