import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import { loginUser } from "../../redux/userSlice";
import "@testing-library/jest-dom";

// Mock store
const mockStore = configureStore([]);
const store = mockStore({});
store.dispatch = jest.fn(() =>
  Promise.resolve({ type: loginUser.fulfilled.type, payload: { user: { role: "admin" }, token: "Admin@1234" } })
);

// Mock loginUser
jest.mock("../../redux/userSlice", () => ({
  loginUser: jest.fn()
}));

// Mock window.alert to avoid errors in tests
window.alert = jest.fn();

const renderWithProviders = (ui) => {
  render(<Provider store={store}><BrowserRouter>{ui}</BrowserRouter></Provider>);
};

test("📌 Snapshot test for LoginPage", () => {
  renderWithProviders(<LoginPage />);
  expect(document.body).toMatchSnapshot();
});

test("📌 Email input accepts valid email format", () => {
  renderWithProviders(<LoginPage />);
  const email = screen.getByPlaceholderText("Enter your Email");
  fireEvent.change(email, { target: { value: "dodialhaddabi@hotmail.com" } });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(regex.test(email.value)).toBe(true);
});

test("📌 Password input accepts user typing", () => {
  renderWithProviders(<LoginPage />);
  const password = screen.getByPlaceholderText("Enter your Password");
  fireEvent.change(password, { target: { value: "Dodi@1234" } });

  expect(password.value).toBe("Dodi@1234");
});

test("📌 Login button triggers dispatch", async () => {
  renderWithProviders(<LoginPage />);

  fireEvent.change(screen.getByPlaceholderText("Enter your Email"), { target: { value: "test@mail.com" } });
  fireEvent.change(screen.getByPlaceholderText("Enter your Password"), { target: { value: "Abc@1234" } });

  fireEvent.click(screen.getByText("Login"));
  expect(store.dispatch).toHaveBeenCalled();
});
