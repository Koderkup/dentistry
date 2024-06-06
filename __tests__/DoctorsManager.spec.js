import DoctorsManager from "../pages/doctors/create/[[...id]]";
import React, { useContext } from "react";
import * as fetchData from "../utils/fetchData";
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

describe("DoctorsManager", () => {
  it("renders correctly form", async () => {
    const mockedRouter = {
      query: {
        id: "mockedId",
      },
    };
    useRouter.mockImplementation(() => mockedRouter);
    jest.spyOn(fetchData, "getData").mockResolvedValue({
      json: () =>
        Promise.resolve({
          doctor: [
            [
              {
                id: "mockedId",
                sirname: "Mocked Doctor",
                fullname: "Mocked Doctor Name",
                proff: "dentist",
                avatar: [{ url: "image.url" }],
                description: "mocked description",
              },
            ],
          ],
        }),
    });

    jest.spyOn(React, "useState");
    render(
      <DataContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <DoctorsManager />
      </DataContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Фамилия/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Полное имя")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Профессиональное направление")
      ).toBeInTheDocument();
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
    jest.spyOn(fetchData, "postData").mockResolvedValue({
      json: () => Promise.resolve({ msg: "Doctor created successfully" }),
    });
    render(
      <DataContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <DoctorsManager />
      </DataContext.Provider>
    );
    waitFor(() => {
      const createButton = screen.getByText("Создать");
      expect(createButton).toBeInTheDocument();
      expect(screen.getByText("Обновить")).not.toBeInTheDocument();
      const sirnameInput = screen.getByPlaceholderText("Фамилия");
      const fullnameInput = screen.getByPlaceholderText("Полное имя");
      const proffInput = screen.getByPlaceholderText(
        "Профессиональное направление"
      );
      const contentInput = screen.getByPlaceholderText("Описание");
      const fileInput = screen.getByTestId("file-input");
      const file = new File(["content"], "image.png", { type: "image/png" });
      fireEvent.change(sirnameInput, {
        target: { name: "sirname", value: "Mocked Doctor" },
      });
      fireEvent.change(fullnameInput, {
        target: { name: "fullname", value: "Mocked Doctor Name" },
      });
      fireEvent.change(proffInput, {
        target: { name: "proff", value: "dentist" },
      });
      fireEvent.change(contentInput, {
        target: { name: "description", value: "mocked description" },
      });
      fireEvent.change(fileInput, { target: { files: [file] } });

      fireEvent.click(createButton);
      expect(postData).toHaveBeenCalledWith(
        "doctors",
        {
          sirname: "Mocked Doctor",
          fullname: "Mocked Doctor Name",
          proff: "dentist",
          avatar: [{ url: "image.url" }],
          description: "mocked description",
        },
        "test-token"
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "NOTIFY",
        payload: { success: "Doctor created successfully" },
      });
    });
  });

  it("should handle doctor update correctly", async () => {
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
        <DoctorsManager />
      </DataContext.Provider>
    );
    
    waitFor(() => {
      const sirnameInput = screen.getByPlaceholderText("Фамилия");
      const fullnameInput = screen.getByPlaceholderText("Полное имя");
      const proffInput = screen.getByPlaceholderText(
        "Профессиональное направление"
      );
      const contentInput = screen.getByPlaceholderText("Описание");
      const fileInput = screen.getByTestId("file-input");
      const file = new File(["content"], "image.png", { type: "image/png" });
      fireEvent.change(sirnameInput, {
        target: { name: "sirname", value: "Updated Doctor" },
      });
      fireEvent.change(fullnameInput, {
        target: { name: "fullname", value: "Updated Doctor Name" },
      });
      fireEvent.change(proffInput, {
        target: { name: "proff", value: "updated dentist" },
      });
      fireEvent.change(contentInput, {
        target: { name: "description", value: "updated mocked description" },
      });
      fireEvent.change(fileInput, { target: { files: [file] } });
      const mockHandleSubmit = jest.fn();
      jest
        .spyOn(require("../pages/doctors/create/[[...id]]"), "handleSubmit")
        .mockImplementation(mockHandleSubmit);
        
      const updateButton = screen.getByText("Обновить");
      fireEvent.click(updateButton);
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        sirname: "Updated Doctor",
        fullname: "Updated Doctor Name",
        proff: "updated dentist",
        avatar: [{ url: "old-image-url" }, { url: "new-image-url" }],
        description: "updated mocked description",
      });
    });
  });
});
