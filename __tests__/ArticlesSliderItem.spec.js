import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import ArticlesSliderItem from "../components/ArticlesSliderItem";
import { toHaveAttribute } from "@testing-library/jest-dom";

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

const mockArticle = {
  id: 1,
  header: "Article Header 1",
  content: "Content for Article 1",
  image: [{ url: "https://i.postimg.cc/2yhzpTdY/Screenshot-10.png" }],
};

describe("ArticlesSliderItem", () => {
  it("should render the article", () => {
    render(<ArticlesSliderItem article={mockArticle} />);

    expect(screen.getByText(mockArticle.header)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "article-item");
  });
});
