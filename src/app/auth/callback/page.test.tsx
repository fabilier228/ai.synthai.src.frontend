import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as AuthContext from "@/contexts/AuthContext";
import CallbackPage from "./page";

describe("Auth callback page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("success flow calls refreshUser and redirects to /", async () => {
    const refreshUser = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
        refreshUser,
        isLoading: false,
        isAuthenticated: false,
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
        openEmailSettings: function (): void {
            throw new Error("Function not implemented.");
        },
        openPasswordSettings: function (): void {
            throw new Error("Function not implemented.");
        }
    });

    render(<CallbackPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/Authentication successful!/i),
      ).toBeInTheDocument(),
    );
    expect(refreshUser).toHaveBeenCalled();

    jest.advanceTimersByTime(1500);
    await waitFor(() =>
      expect(screen.getByText(/redirecting/i)).toBeInTheDocument(),
    );
  });

  test("error flow shows failure message and redirects to /login", async () => {
    const refreshUser = jest.fn().mockRejectedValue(new Error("fail"));
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
        refreshUser,
        isLoading: false,
        isAuthenticated: false,
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
        openEmailSettings: function (): void {
            throw new Error("Function not implemented.");
        },
        openPasswordSettings: function (): void {
            throw new Error("Function not implemented.");
        }
    });

    render(<CallbackPage />);

    await waitFor(() =>
      expect(screen.getByText(/Authentication Failed/i)).toBeInTheDocument(),
    );
    expect(refreshUser).toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    await waitFor(() =>
      expect(screen.getByText(/redirecting/i)).toBeInTheDocument(),
    );
  });
});
