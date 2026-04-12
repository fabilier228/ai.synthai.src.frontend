import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

const { useAuth } = require("@/contexts/AuthContext");
const nav = require("next/navigation");

describe("Auth callback page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("success flow calls refreshUser and redirects to /", async () => {
    const push = jest.fn();
    nav.useRouter = () => ({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    const refreshUser = jest.fn().mockResolvedValue(undefined);
    useAuth.mockReturnValue({
      refreshUser,
      isLoading: false,
      isAuthenticated: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByText(/Authentication successful!/i),
      ).toBeInTheDocument(),
    );
    expect(refreshUser).toHaveBeenCalled();

    jest.advanceTimersByTime(1500);
    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
  });

  test("error flow shows failure message and redirects to /login", async () => {
    const push = jest.fn();
    nav.useRouter = () => ({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: "/",
      query: {},
    });

    const refreshUser = jest.fn().mockRejectedValue(new Error("fail"));
    useAuth.mockReturnValue({
      refreshUser,
      isLoading: false,
      isAuthenticated: false,
    });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Authentication Failed/i)).toBeInTheDocument(),
    );
    expect(refreshUser).toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    await waitFor(() => expect(push).toHaveBeenCalledWith("/login"));
  });
});
