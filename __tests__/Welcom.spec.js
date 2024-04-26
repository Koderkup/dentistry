import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import Welcom from "@/components/Welcom";
import {
  toHaveClass,
  toHaveAttribute,
} from "@testing-library/jest-dom";
describe("Welcom", () => {
  test("render without errors", async () => {
    const mockState = {
      notify: {},
      auth: {},
      modal: {},
      services: [],
      users: [],
      doctors: [],
      articles: [],
      filtered_articles: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      actions: [],
      reviews: [],
      widgets: [],
    };

    jest
      .spyOn(React, "useContext")
      .mockImplementation(() => ({ state: mockState }));

    await act(async () => {
      render(
        <DataContext.Provider value={{ state: {} }}>
          <Welcom />
        </DataContext.Provider>
      );
    });
    const elementsWithText = screen.queryAllByText((content) =>
      content.includes("Добро пожаловать в стоматологическую клинику Мирастом")
    );
    expect(elementsWithText).toHaveLength(1);

    const image = screen.getByAltText("mirastom_team");
    expect(image).toHaveAttribute("alt", 'mirastom_team');

    const article = screen.getByRole("article");
    expect(article).toHaveClass("text");

    const aside  = screen.getByTestId("aside")
    expect(aside).toHaveClass("aside");
    expect(aside).toBeInTheDocument();

    React.useContext.mockRestore();
  });
});
