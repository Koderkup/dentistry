import React, { useContext } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DataContext } from "@/store/GlobalState";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import UserReviewForm from "@/components/UserReviewForm";

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
const mockDispatch = jest.fn();
jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: mockDispatch,
}));
const mockedHandleSelectedReview = jest.fn();
const mockedReview = {
    id: 1,
    name: 'Petr',
    comment: 'mocked comment',
    avatar: 'man',
    rating: 5,
    checked: false,
    timestamp: new Date(),
    view: false
}
describe("UserReviewForm", () => {
  it("renders the form correctly", () => {
    const mockedChecked = false;
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <UserReviewForm
          review={mockedReview}
          checked={mockedChecked}
          handleSelectedReview={mockedHandleSelectedReview}
        />
      </DataContext.Provider>
    );
    const reviewForm = screen.getByTestId('form')
    expect(reviewForm).toHaveClass('user_review_form');
    const image = screen.getByAltText("user-avatar");
    expect(image).toHaveAttribute(
      "src",
      `/_next/image?url=%2Fassets%2F${mockedReview.avatar}.png&w=64&q=75`
    );
    expect(screen.getByText("Petr")).toBeInTheDocument();
    expect(screen.getByText("Рейтинг услуги:")).toBeInTheDocument();
    expect(screen.getAllByTestId("star-svg")).toHaveLength(5);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Удалить")).toBeInTheDocument();
    expect(screen.getByText("Опубликовать")).toBeInTheDocument();
  });

  it("updates the text correctly", () => {
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <UserReviewForm
          review={mockedReview}
          checked={false}
          handleSelectedReview={jest.fn()}
        />
      </DataContext.Provider>
    );

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "Updated comment" } });
    expect(textArea).toHaveValue("Updated comment");
  });
  it("calls handleSelectedReview when the checkbox is clicked", () => {
    const handleSelectedReview = jest.fn();
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <UserReviewForm
          review={mockedReview}
          checked={false}
          handleSelectedReview={handleSelectedReview}
        />
      </DataContext.Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleSelectedReview).toHaveBeenCalledWith(mockedReview.id);
  });
});
