import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import CardsPage from "../CardsPage";
import "@testing-library/jest-dom";

// Mock store
const mockStore = configureStore([]);
const store = mockStore({});
store.dispatch = jest.fn();

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: "1",
            title: "Birthday Card",
            price: 1.5,
            stock: 50,
            category: "birthday",
            imageUrl: "test.jpg",
          },
        ]),
    })
  );
});

// Wrap render in act for async state updates
const renderWithProviders = async (ui) => {
  await act(async () => {
    render(<Provider store={store}><BrowserRouter>{ui}</BrowserRouter></Provider>);
  });
};

test("📌 Snapshot of CardsPage UI", async () => {
  await renderWithProviders(<CardsPage />);
  expect(document.body).toMatchSnapshot();
});

test("📌 Cards are rendered from fetch", async () => {
  await renderWithProviders(<CardsPage />);
  const card = await screen.findByText("Birthday Card");
  expect(card).toBeInTheDocument();
});

test("📌 Category filter works", async () => {
  await renderWithProviders(<CardsPage />);
  await screen.findByText("Birthday Card");

  const dropdown = screen.getByRole("combobox");
  fireEvent.change(dropdown, { target: { value: "birthday" } });

  expect(dropdown.value).toBe("birthday");
});

test("📌 Add to cart dispatch works", async () => {
  await renderWithProviders(<CardsPage />);
  await screen.findByText("Birthday Card");

  const addBtn = screen.getByText("Add to Cart");
  fireEvent.click(addBtn);

  expect(store.dispatch).toHaveBeenCalled();
});
