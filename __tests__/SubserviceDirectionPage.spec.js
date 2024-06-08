import SubserviceDirectionPage from "../pages/subservice-direction/[id]";
import React, { useContext } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryByLabelText,
  getByText,
} from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
const mockState = {
  notify: {},
  auth: {},
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
const mockedSubDirection = [
  {
    id: 1,
    dirarticle: 'mocked diraticle',
    dirtitle: 'mocked dirtitle',
    dirimage: [{ url: "https://mocked-dirimage-url" }],
  },
];
describe("SubserviceDirectionPage", () => {
  it("renders correctly", () => {
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <SubserviceDirectionPage subdirection={mockedSubDirection} />
      </DataContext.Provider>
    );
    expect(screen.getByText("mocked diraticle")).toBeInTheDocument();
    const dirTitles = screen.getAllByText("mocked dirtitle");
    expect(dirTitles.length).toBe(2);
    const image = screen.getByAltText("subdirection title");
    expect(image).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fmocked-dirimage-url&w=640&q=75"
    );
    const btn = screen.queryByText("Изменить напр/подуслуги");
    expect(btn).not.toBeInTheDocument();
  });
  it("renders of admin menu", () => {
    mockState.auth = {
      user: { name: "user", role: "admin", email: "email@mail.com" },
      token: "test-token",
    };
   render(
     <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
       <SubserviceDirectionPage subdirection={mockedSubDirection} />
     </DataContext.Provider>
   );
    const btn = screen.getByText("Изменить напр/подуслуги");
    expect(btn).toBeInTheDocument();
  });
});
