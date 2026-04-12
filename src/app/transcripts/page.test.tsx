import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Use global useAuth mock from jest.setup
const { useAuth } = require("@/contexts/AuthContext");

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("AllTranscriptsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows empty state when no transcripts", async () => {
    useAuth.mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
    });

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transcriptions: [] }),
    });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/No transcripts found/i)).toBeInTheDocument(),
    );
  });

  test("renders transcripts and deletes one on delete click", async () => {
    useAuth.mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResponse = {
      transcriptions: [{ id: 1, title: "Meeting Alpha" }],
    };

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse })
      .mockResolvedValueOnce({ ok: true });

    (global.fetch as jest.Mock) = mockFetch;

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Alpha/i)).toBeInTheDocument(),
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() =>
      expect(screen.queryByText(/Meeting Alpha/i)).not.toBeInTheDocument(),
    );

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/transcriptions/1"),
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  test("shows alert when delete fails", async () => {
    useAuth.mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResponse = { transcriptions: [{ id: 2, title: "Meeting Beta" }] };

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse })
      .mockResolvedValueOnce({ ok: false });

    (global.fetch as jest.Mock) = mockFetch;

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Beta/i)).toBeInTheDocument(),
    );

    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith("Failed to delete transcript."),
    );

    alertSpy.mockRestore();
  });

  test("shows error when fetching transcripts fails", async () => {
    useAuth.mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
    });

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockRejectedValueOnce(new Error("network"));

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch transcripts./i),
      ).toBeInTheDocument(),
    );
  });

  test("does not fetch when user.sub is missing", async () => {
    useAuth.mockReturnValue({
      user: {},
      isAuthenticated: true,
      isLoading: false,
    });

    const fetchSpy = jest.fn();
    (global.fetch as jest.Mock) = fetchSpy;

    const Page = require("./page").default;
    render(<Page />);
    
    await new Promise((r) => setTimeout(r, 20));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("navigates to transcript detail on click", async () => {
    useAuth.mockReturnValue({
      user: { sub: "user1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResponse = {
      transcriptions: [{ id: 3, title: "Meeting Gamma" }],
    };
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse });

    const Page = require("./page").default;
    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText(/Meeting Gamma/i)).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText(/Meeting Gamma/i));

    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining("/transcripts/3"),
    );
  });
});
