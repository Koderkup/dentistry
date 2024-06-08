import SubservicePage from "../pages/subservices/[id]";
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

const mockedDirections = [{ id: 1, dirtitle: "mocked dirtitle" }];
const mockedSubservice = [
  {
    id: 1,
    title: "title-subservice",
    article: "article about",
    description: "mocked description",
    subtitle: "mocked subtitle",
    subimage: [{ url: "https://mocked-image-url" }],
  },
];
describe("SubservicePage", () => {
  it("renders correctly", async () => {
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <SubservicePage
          subservice={mockedSubservice}
          directions={mockedDirections}
        />
      </DataContext.Provider>
    );
    expect(screen.getByText("title-subservice")).toBeInTheDocument();
    expect(screen.getByText("article about")).toBeInTheDocument();
    expect(screen.getByText("mocked description")).toBeInTheDocument();
    expect(screen.getByText("mocked dirtitle")).toBeInTheDocument();
    const image = screen.getByAltText("subservice title");
    expect(image).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fmocked-image-url&w=640&q=75"
    );
    const btn = screen.queryByText("Изменить подуслугу");
    expect(btn).not.toBeInTheDocument();
  });
  it("renders of admin menu", () => {
    mockState.auth = {
      user: { name: "user", role: "admin", email: "email@mail.com" },
      token: "test-token",
    };
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <SubservicePage
          subservice={mockedSubservice}
          directions={mockedDirections}
        />
      </DataContext.Provider>
    );
    const btn = screen.getByText("Изменить подуслугу");
    expect(btn).toBeInTheDocument();
  });
});
