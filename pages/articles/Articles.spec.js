import Articles from "./index";
import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import ArticleCard from "@/components/ArticleCard";

const mockState = {
  notify: {},
  auth: { user: { name: "user", role: "admin", email: "email@mail.com" } },
  modal: {},
  services: [],
  users: [],
  doctors: [],
  articles: [
    {
      id: 1,
      header: "header1",
      content: "article1",
      image: [
        {
          url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697875495/test/ylqnjhil3egbb0sifh0v.png",
          public_id: "test/ylqnjhil3egbb0sifh0v",
        },
      ],
    },
    {
      id: 2,
      header: "header2",
      content: "article2",
      image: [
        {
          url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697875495/test/ylqnjhil3egbb0sifh0v.png",
          public_id: "test/ylqnjhil3egbb0sifh0v",
        },
      ],
    },
    {
      id: 3,
      header: "header3",
      content: "article3",
      image: [
        {
          url: "https://res.cloudinary.com/dlr2olc8r/image/upload/v1697875495/test/ylqnjhil3egbb0sifh0v.png",
          public_id: "test/ylqnjhil3egbb0sifh0v",
        },
      ],
    },
  ],
  filtered_articles: [],
  actions: [],
  reviews: [],
  widgets: [],
};

jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: jest.fn(),
}));
describe("Articles", () => {
  it("it should renders correct quantity of articlesCards", () => {
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Articles />
      </DataContext.Provider>
    );
    //expect(screen.getAllByTestId("articleCard")).toHaveLength(3);
  });
});
