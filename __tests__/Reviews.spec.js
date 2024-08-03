import { render, screen, fireEvent } from "@testing-library/react";
import { toHaveClass, toHaveAttribute } from "@testing-library/jest-dom";
import Reviews from "../pages/reviews/index";
import { DataContext } from "../store/GlobalState";
import { typography } from "../utils/typography";
import UserReviewForm from "../components/UserReviewForm";
import RemoveSelected from "../components/RemoveSelected";
import AdButton from "../components/AdButton";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import { postData, getData } from "../utils/fetchData";
import ReCAPTCHA from "react-google-recaptcha";

const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    comment: "Great service!",
    rating: 5,
    avatar: "woman",
    timestamp: "2023-03-15T10:00:00.000Z",
    view: true,
    checked: false,
  },
  {
    id: 2,
    name: "Jane Doe",
    comment: "Excellent experience!",
    rating: 4,
    avatar: "man",
    timestamp: "2023-03-10T12:00:00.000Z",
    view: true,
    checked: false,
  },
];
jest.mock("../hooks/usePagination");

jest.mock("react-google-recaptcha", () => {
  const React = require("react");
  const ReCAPTCHA = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      reset: jest.fn(),
      execute: () => {
        props.onChange("test-v2-token");
      },
    }));
    return <input ref={ref} data-testid="mock-v2-captcha-element" {...props} />;
  });

  return ReCAPTCHA;
});

const mockPagination = {
  firstContentIndex: 0,
  lastContentIndex: 6,
  nextPage: jest.fn(),
  prevPage: jest.fn(),
  page: 1,
  setPage: jest.fn(),
  totalPages: 2,
};

const mockPostData = jest.fn().mockResolvedValue({
  status: "success",
  msg: "Review added successfully",
});

const mockRecaptchaChange = jest.fn();
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

const mockHandleOpenReviewForm = jest.fn();

describe("Reviews Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePagination.mockReturnValue(mockPagination);
    jest.mock("../utils/fetchData", () => ({
      getData: jest
        .fn()
        .mockResolvedValue({ reviewsProps: mockReviews, result: {} }),
      postData: jest.fn().mockImplementation(mockPostData),
    }));
  });

  it("renders correctly with admin user", () => {
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Reviews/>
      </DataContext.Provider>
    );

    expect(screen.getByAltText("pleased client")).toBeInTheDocument();
    expect(screen.getByAltText("reviews")).toBeInTheDocument();
    expect(screen.getByText("Сортировать")).toBeInTheDocument();
    expect(screen.queryByText("Оставьте отзыв")).not.toBeInTheDocument();
    expect(screen.getByText("Выбрать все")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });

  it("renders correctly with non-admin user", () => {
    mockState.auth.user.role = "user";
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Reviews reviewsProps={mockReviews} />
      </DataContext.Provider>
    );
    expect(screen.queryByText("Выбрать все")).not.toBeInTheDocument();
    expect(screen.getByText("Оставьте отзыв")).toBeInTheDocument();
  });

  it("opens and closes review form", () => {
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: jest.fn() }}
      >
        <Reviews reviewsProps={mockReviews} />
      </DataContext.Provider>
    );

    const addReviewButton = screen.getByText("Оставьте отзыв");
    fireEvent.click(addReviewButton);

    expect(
      screen.getByText("Поделитесь своими впечатлениями")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Опубликовать" })
    ).toBeInTheDocument();

    const closeButton = screen.getByAltText("cross");
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("Поделитесь своими впечатлениями")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Опубликовать" })
    ).not.toBeInTheDocument();
  });

  it("handles selection of all reviews", () => {
    mockState.auth.user.role = 'admin';
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: jest.fn() }}
      >
        <Reviews reviewsProps={mockReviews} />
      </DataContext.Provider>
    );
    const selectAllCheckbox = screen.getByTestId("selectAll");
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();
  });
});
