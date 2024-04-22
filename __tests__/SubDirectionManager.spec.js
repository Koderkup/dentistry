import React from "react";
import { act } from "react-dom/test-utils";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SubDirectionManager from "@/pages/subservice-direction/create/[[...id]]";
import { toHaveClass } from "@testing-library/jest-dom";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/fetchData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      subServiceDirection: [
        {
          id: 1,
          subtitle: "Название",
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

  test("renders without errors", async () => {
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
    await act(async () => {
      render(
        <DataContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
          <SubDirectionManager />
        </DataContext.Provider>
      );
    });
    const elementsWithText = screen.queryAllByText((content) =>
      content.includes("Название")
    );
    expect(elementsWithText.length).toBeGreaterThan(1);
    React.useContext.mockRestore();
  });

});