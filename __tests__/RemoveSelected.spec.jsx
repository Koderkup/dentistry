import RemoveSelected from "@/components/RemoveSelected";
import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByAltText,
} from "@testing-library/react";
import { useRouter } from "next/router";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import { DataContext } from "@/store/GlobalState";
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
  widgets: [],
};

let mockedChecked = false;
const mockhandleSelectionAll = jest.fn();
const mockselectedReviewsForRemove = [1, 2, 3];
const mockedDispatch = jest.fn();
jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockedState,
  dispatch: mockedDispatch,
}));
describe("RemoveSelected", () => {
  it("it should renders correctly", () => {
    render(
      <DataContext.Provider value={{ state: mockedState, dispatch: jest.fn() }}>
        <RemoveSelected
          checked={mockedChecked}
          handleSelectionAll={mockhandleSelectionAll}
          selectedReviewsForRemove={mockselectedReviewsForRemove}
        />
      </DataContext.Provider>
    );
    expect(screen.getByAltText("trash")).toBeInTheDocument();
    expect(screen.getByText("Выбрать все")).toBeInTheDocument();
  });

  it("it should have to call the functions ", () => {
    render(
      <DataContext.Provider value={{ state: mockedState, dispatch: mockedDispatch }}>
        <RemoveSelected
          checked={mockedChecked}
          handleSelectionAll={mockhandleSelectionAll}
          selectedReviewsForRemove={mockselectedReviewsForRemove}
        />
      </DataContext.Provider>
    );
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
    expect(mockedDispatch).toHaveBeenCalled();
    const inp = screen.getByRole("checkbox");
    fireEvent.click(inp);
    expect(mockhandleSelectionAll).toHaveBeenCalled();

  });
});
