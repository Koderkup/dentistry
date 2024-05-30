import AdminLink from "@/components/AdminLink";
import React, { useContext } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import { DataContext } from "@/store/GlobalState";
describe("AdminLink", () => {
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
  const mockUrl = "https://example.com";
  const mockContent = { id: 1, title: "mockData" };
  const mockType = "ADD_MODAL";
  const mockHeader = "header";
  const mockDispatch = jest.fn();
  jest.spyOn(React, "useContext").mockImplementation(() => ({
    state: mockState,
    dispatch: jest.fn(),
  }));
  const mockRouter = {
    push: jest.fn(),
  };
  jest.mock("next/router", () => ({
    useRouter: () => mockRouter,
  }));
  it("shoud renders correctly", async () => {
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <AdminLink
          url={mockUrl}
          content={mockContent}
          type={mockType}
          header={mockHeader}
        />
      </DataContext.Provider>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    fireEvent.click(buttons[1]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(buttons[0]).toHaveClass("admin_button");
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", mockUrl);
  });
});
