// src/pages/__tests__/UserManagement.test.js
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserManagement from "../UserManagement";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";


// Mock axios
jest.mock("axios");

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
      <ToastContainer />
    </BrowserRouter>
  );
};

const mockUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123456789",
    role: "user",
    dateOfBirth: "1990-01-01T00:00:00.000Z",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "987654321",
    role: "admin",
    dateOfBirth: "1985-05-10T00:00:00.000Z",
  },
];

describe("UserManagement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading initially", async () => {
    axios.get.mockResolvedValue({ data: [] });
    renderWithRouter(<UserManagement />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it("renders users fetched from API", async () => {
    axios.get.mockResolvedValue({ data: mockUsers });
    renderWithRouter(<UserManagement />);

    // Wait for users to appear
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Check table rows
    expect(screen.getAllByRole("row")).toHaveLength(mockUsers.length + 1); // +1 for header
  });

  it("shows error if API fails", async () => {
    axios.get.mockRejectedValue(new Error("API error"));
    renderWithRouter(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it("deletes a user successfully", async () => {
    axios.get.mockResolvedValue({ data: mockUsers });
    axios.delete.mockResolvedValue({});

    renderWithRouter(<UserManagement />);

    // Wait for user to render
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Mock window.confirm to always return true
    window.confirm = jest.fn(() => true);

    // Click delete icon for first user
    fireEvent.click(screen.getAllByTitle("Delete User")[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:5000/api/users/1`
      );
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });
});
