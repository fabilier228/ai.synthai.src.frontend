import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as AuthContext from "@/contexts/AuthContext";

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
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({
          isAuthenticated: false, isLoading: true,
          user: null,
          login: function (): void {
              throw new Error("Function not implemented.");
          },
          register: function (): void {
              throw new Error("Function not implemented.");
          },
          logout: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          refreshUser: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          openEmailSettings: function (): void {
              throw new Error("Function not implemented.");
          },
          openPasswordSettings: function (): void {
              throw new Error("Function not implemented.");
          }
      });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("redirects to /login when not authenticated and not loading", async () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({
          isAuthenticated: false, isLoading: false,
          user: null,
          login: function (): void {
              throw new Error("Function not implemented.");
          },
          register: function (): void {
              throw new Error("Function not implemented.");
          },
          logout: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          refreshUser: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          openEmailSettings: function (): void {
              throw new Error("Function not implemented.");
          },
          openPasswordSettings: function (): void {
              throw new Error("Function not implemented.");
          }
      });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
    expect(screen.queryByText("Child")).not.toBeInTheDocument();
  });

  test("renders children when authenticated", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue({
          isAuthenticated: true, isLoading: false,
          user: null,
          login: function (): void {
              throw new Error("Function not implemented.");
          },
          register: function (): void {
              throw new Error("Function not implemented.");
          },
          logout: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          refreshUser: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          openEmailSettings: function (): void {
              throw new Error("Function not implemented.");
          },
          openPasswordSettings: function (): void {
              throw new Error("Function not implemented.");
          }
      });

    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
