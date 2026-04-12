import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

const useAuth = require("@/contexts/AuthContext").useAuth;

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading UI when auth is loading", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, isLoading: true });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects to /login when not authenticated and not loading", async () => {
    useAuth.mockReturnValue({ isAuthenticated: false, isLoading: false });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
    expect(screen.queryByText("Child")).not.toBeInTheDocument();
  });

  test("renders children when authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
