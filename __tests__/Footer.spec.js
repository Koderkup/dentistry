import React from "react";
import { act } from "react-dom/test-utils";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Footer from "../components/Footer";
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
jest.spyOn(React, "useContext").mockImplementation(()=>({
    state: mockState,
    dispatch: jest.fn()
}))
describe("Footer", () => {
  it("renders correctly", async () => {
    render(
      <DataContext.Provider value={{state: mockState, dispatch: jest.fn()}}>
        <Footer />
      </DataContext.Provider>
    );
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId('scedule')).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText("Услуги")).toBeInTheDocument();
    expect(screen.getByText("Наши работы")).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();
    expect(screen.getByText("Отзывы")).toBeInTheDocument();
    expect(screen.getByText("О нас")).toBeInTheDocument();
    expect(screen.getByText("Полезные статьи")).toBeInTheDocument();
  });
});
