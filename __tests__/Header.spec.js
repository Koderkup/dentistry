import React from "react";
import { act } from "react-dom/test-utils";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
import { toHaveClass } from "@testing-library/jest-dom";
const mockState = {
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
  widgets: [],
};
jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: jest.fn(),
}));
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
describe("Header", () => {
  it("renders correctly logged-router", async () => {
    mockState.auth = {
      user: { avatar: { url: "" } },
      token: "",
    };
    useRouter.mockImplementation(() => ({
      pathname: "/",
    }));
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Header />
      </DataContext.Provider>
    );
    expect(screen.queryByTestId("logged-router")).toBeInTheDocument();
    expect(screen.queryByTestId("admin-router")).not.toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("Услуги")).toBeInTheDocument();
    expect(screen.getByText("Наши работы")).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();
    expect(screen.getByText("Отзывы")).toBeInTheDocument();
    expect(screen.getByText("О нас")).toBeInTheDocument();
    expect(screen.getByText("Полезное")).toBeInTheDocument();
  });
  it("renders log-in button", () => {
    mockState.auth = {};
    useRouter.mockImplementation(() => ({
      pathname: "/",
    }));
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Header />
      </DataContext.Provider>
    );
    expect(screen.getByText("Войти")).toBeInTheDocument();
  });

});
