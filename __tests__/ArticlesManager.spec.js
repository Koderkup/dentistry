import ArticlesManager from "../pages/articles/create/[[...id]]";
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
import { useRouter } from "next/router";
import { postData, getData, putData } from "../utils/fetchData";
import { imageUpload } from "../utils/imagesUpload";
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
jest.mock("../utils/fetchData");
jest.mock("../utils/imagesUpload");

jest.spyOn(React, "useContext").mockImplementation(() => ({
  state: mockState,
  dispatch: jest.fn(),
}));
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ArticlesManager", () => {
  it("renders correctly form", async () => {
    const mockedRouter = {
      query: {
        id: "mockedId",
      },
    };
    useRouter.mockImplementation(() => mockedRouter);
    jest
      .spyOn(require("../utils/fetchData"), "getData")
      .mockResolvedValue({
        json: () =>
          Promise.resolve({
            article: [
              [
                {
                  id: "mockedId",
                  title: "Mocked Article",
                  content: "Mocked content",
                  image: [{ url: "image.url" }, { url: "image2.url" }],
                },
              ],
            ],
          }),
      });
    jest.spyOn(React, "useState");
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <ArticlesManager />
      </DataContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Заголовок статьи/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Название")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Описание")).toBeInTheDocument();
      expect(screen.queryByText("Создать")).not.toBeInTheDocument();
      expect(screen.getByText("Обновить")).toBeInTheDocument();
    });
  });

  it("renders create button", async () => {
    const mockedRouter = {
      query: {
        id: "",
      },
    };
    useRouter.mockImplementation(() => mockedRouter);
    const mockDispatch = jest.fn();
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <ArticlesManager />
      </DataContext.Provider>
    );
    waitFor(() => {
      const createButton = screen.getByText("Создать");
      expect(createButton).toBeInTheDocument();
      expect(screen.getByText("Обновить")).not.toBeInTheDocument();
      const headerInput = screen.getByPlaceholderText("Название");
      const contentInput = screen.getByPlaceholderText("Описание");
      const fileInput = screen.getByTestId("file-input");
      const file = new File(["content"], "image.png", { type: "image/png" });
      fireEvent.change(headerInput, {
        target: { name: "header", value: "New article" },
      });
      fireEvent.change(contentInput, {
        target: { name: "content", value: "Article content" },
      });
      fireEvent.change(fileInput, { target: { files: [file] } });

      fireEvent.click(createButton);
      expect(postData).toHaveBeenCalledWith(
        "articles",
        {
          header: "New article",
          content: "Article content",
          image: [{ url: "image-url" }],
        },
        "test-token"
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "NOTIFY",
        payload: { success: "Article created successfully" },
      });
    });
  });

  it("should handle article update correctly", async () => {
    const mockedRouter = {
      query: {
        id: "mockedId",
      },
    };
    useRouter.mockImplementation(() => mockedRouter);
    const mockDispatch = jest.fn();
    const mockImage = [{ url: "old-image-url" }, { url: "new-image-url" }];
    const mockOnEdit = true;
    jest.mock("../utils/imagesUpload", () => ({
      imageUpload: jest.fn(async (mockImage) =>
        mockImage.map((img) => ({ url: `mock-url-${img.url}` }))
      ),
    }));
    jest
      .spyOn(require("../utils/fetchData"), "getData")
      .mockResolvedValue({
        json: () =>
          Promise.resolve({
            article: [
              [
                {
                  id: "mockedId",
                  title: "Mocked Article",
                  content: "Mocked content",
                  image: mockImage,
                },
              ],
            ],
          }),
      });

    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [mockImage, jest.fn()])
      .mockImplementationOnce(() => [mockOnEdit, jest.fn()]);

    global.URL = {
      createObjectURL: jest.fn(),
    };
    global.URL.createObjectURL.mockReturnValue("image-url");
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <ArticlesManager />
      </DataContext.Provider>
    );

    waitFor(() => {
      const headerInput = screen.getByPlaceholderText("Название");
      const contentInput = screen.getByPlaceholderText("Описание");
      const updateButton = screen.getByText("Обновить");
      const fileInput = screen.getByTestId("file-input");
      const file = new File(["content"], "image.png", { type: "image/png" });
      fireEvent.change(headerInput, {
        target: { name: "header", value: "Updated article" },
      });
      fireEvent.change(contentInput, {
        target: { name: "content", value: "Updated content" },
      });
      fireEvent.change(fileInput, { target: { files: [file] } });

      const mockHandleSubmit = jest.fn();
      jest
        .spyOn(require("../pages/articles/create/[[...id]]"), "handleSubmit")
        .mockImplementation(mockHandleSubmit);

      fireEvent.click(updateButton);
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        header: "Updated article",
        content: "Updated content",
        image: [{ url: "old-image-url" }, { url: "new-image-url" }],
      });
    });
  });
});
