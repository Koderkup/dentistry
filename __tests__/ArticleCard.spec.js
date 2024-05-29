import ArticleCard from "@/components/ArticleCard";
import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";

const mockState = {
  notify: {},
  auth: { user: { name: "user", role: "admin", email: "email@mail.com" } },
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
const mockContent = {
  id: 1,
  header: "Как подготовиться к посещению стоматолога",
  content: "Статья про подготовку перед посещением стоматолога",
  image: [
    {
      url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697875495/test/ylqnjhil3egbb0sifh0v.png",
      public_id: "test/ylqnjhil3egbb0sifh0v",
    },
  ],
};
describe("ArticleCard", () => {
  it("renders correctly", () => {
    render(
      <DataContext.Provider
        value={{ state: { mockState }, dispatch: jest.fn() }}
      >
        <ArticleCard content={mockContent} />
      </DataContext.Provider>
    );
    expect(screen.getByTestId("articleCard")).toBeInTheDocument();
    expect(
      screen.getByText("Как подготовиться к посещению стоматолога")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Статья про подготовку перед посещением стоматолога")
    ).toBeInTheDocument();
    expect(screen.getByAltText("article-peace")).toBeInTheDocument();
    const adminButtons = screen.getAllByRole("button");
    expect(adminButtons).toHaveLength(2);
    expect(adminButtons[0]).toHaveClass("admin_button");
    expect(adminButtons[1]).toHaveClass("admin_button");
  });
});
