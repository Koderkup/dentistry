import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import ArticlesSlider from "@/components/ArticlesSlider";
import ArticlesSliderItem from "../components/ArticlesSliderItem";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
const mockArticles = [
  {
    id: 1,
    header: "Article Header 1",
    content: "Content for Article 1",
    image: [{ url: "image1.jpg" }],
  },
  {
    id: 2,
    header: "Article Header 2",
    content: "Content for Article 2",
    image: [{ url: "image2.jpg" }],
  },
];

const mockState = {
  notify: {},
  auth: {},
  modal: {},
  services: [],
  users: [],
  doctors: [],
  articles: [],
  filtered_articles: mockArticles,
  actions: [],
  reviews: [],
  widgets: [],
};

jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: jest.fn(),
}));

jest.mock("../components/ArticlesSliderItem", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(({ article }) => (
      <div data-testid="article-item">{article.header}</div>
    )),
}));
describe("ArticlesSlider", () => {
  it("should render the articles slider", async () => {
    const { container } = render(
      <DataContext.Provider value={{ state: { articles: mockArticles } }}>
        <ArticlesSlider>
          <ArticlesSliderItem article={mockArticles[0]} />
        </ArticlesSlider>
      </DataContext.Provider>
    );
    const parent = screen.getByTestId("article-slider");
    expect(parent).toBeInTheDocument();
    const titleElement = screen.getByText("Полезные статьи");
    expect(titleElement).toBeInTheDocument();
    const archiveLink = screen.getByText("Архив статей");
    expect(archiveLink).toBeInTheDocument();
    expect(archiveLink).toHaveAttribute("href", "/articles");
    expect(archiveLink).toHaveStyle({ fontSize: "16px" });
  });
});
