import React from "react";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import {
  toHaveClass
} from "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import SubDirectionManager from "@/pages/subservice-direction/create/[[...id]]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/fetchData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      subServiceDirection: [
        {
          /* mocked data */
        },
      ],
    })
  ),
  postData: jest.fn(() =>
    Promise.resolve({
      success: "Mock success message",
    })
  ),
  putData: jest.fn(() =>
    Promise.resolve({
      success: "Mock success message",
    })
  ),
}));

describe("SubDirectionManager", () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: { id: "your_id_value" },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without errors", () => {
    const mockState = {
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
    const mockDispatch = jest.fn();
    jest
      .spyOn(React, "useContext")
      .mockImplementation(() => ({ state: mockState, dispatch: mockDispatch }));
    const { container } = render(
      <DataContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
        <SubDirectionManager />
      </DataContext.Provider>
    );
    React.useContext.mockRestore();
    const input = container.querySelector("input[name='dirtitle']");
    fireEvent.change(input, { target: { value: "New Title" } });
    expect(input.value).toBe("New Title");
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.queryByText("Название подуслуги")).toBeInTheDocument();
    expect(screen.queryByText("Название")).toBeInTheDocument();
    expect(screen.queryByText("Статья")).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btn-info");
  });
});
