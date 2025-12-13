import React from "react";
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CardManagement from "../CardManagement";
import "@testing-library/jest-dom";


// mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// mock toast
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// mock window.confirm
beforeEach(() => {
  Object.defineProperty(window, "confirm", {
    writable: true,
    value: jest.fn(() => true),
  });
});


//FETCH MOCK

const mockCards = [
  {
    _id: "1",
    title: "Birthday Card",
    price: 1.5,
    stock: 10,
    category: "birthday",
    imageUrl: "test.jpg",
  },
];

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url, options) => {
    // GET cards
    if (!options || options.method === "GET") {
      return Promise.resolve({
        ok: true,
        json: async () => mockCards,
      });
    }

    // DELETE card
    if (options.method === "DELETE") {
      return Promise.resolve({
        ok: true,
        json: async () => ({ message: "Card deleted" }),
      });
    }

    // POST / PUT card
    return Promise.resolve({
      ok: true,
      json: async () => mockCards[0],
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

//RENDER HELPER

const renderPage = async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <CardManagement />
      </BrowserRouter>
    );
  });
};

//TESTS

test("📌 renders page and fetches cards", async () => {
  await renderPage();

  expect(await screen.findByText("Birthday Card")).toBeInTheDocument();
  expect(screen.getByText("1.5 OMR")).toBeInTheDocument();
});

test("📌 category filter works", async () => {
  await renderPage();

  const dropdown = screen.getByRole("combobox");
  fireEvent.change(dropdown, { target: { value: "birthday" } });

  expect(dropdown.value).toBe("birthday");
});

test("📌 open Add New Card modal", async () => {
  await renderPage();

  await userEvent.click(
    screen.getByRole("button", { name: /add new card/i })
  );

  expect(await screen.findByRole("heading", { name: "Add New Card" })).toBeInTheDocument();
});

test("📌 validation errors shown when saving empty form", async () => {
  await renderPage();

  await userEvent.click(
    screen.getByRole("button", { name: /add new card/i })
  );

  await userEvent.click(
    screen.getByRole("button", { name: /add card/i })
  );

  expect(await screen.findByText("Title is required")).toBeInTheDocument();
  expect(screen.getByText("Enter a valid price")).toBeInTheDocument();
  expect(screen.getByText("Stock must be a number")).toBeInTheDocument();
});

test("📌 edit icon opens modal with card data", async () => {
  await renderPage();

  const editBtn = await screen.findByTitle("Edit Card");
  await userEvent.click(editBtn);

  expect(await screen.findByDisplayValue("Birthday Card")).toBeInTheDocument();
});

test("📌 delete card calls delete API", async () => {
  await renderPage();

  const deleteBtn = await screen.findByTitle("Delete Card");
  await userEvent.click(deleteBtn);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/cards/1",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});

test("📌 logout navigation works", async () => {
  await renderPage();

  await userEvent.click(screen.getByText("Log Out"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
