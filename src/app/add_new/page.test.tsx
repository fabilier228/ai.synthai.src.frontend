import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewPage from "./page";
import React from "react";

global.fetch = jest.fn();

describe("AddNewPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders header and form fields", () => {
    render(<AddNewPage />);
    expect(screen.getByText(/Add New Transcription/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  test("successfully submits form with POLISH language and handles empty transcription", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        transcriptionAnalysis: { transcription: "" },
      }),
    });

    render(<AddNewPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Title/i), "Test Polish");

    const langButton = screen.getByRole("button", { name: /English/i });
    await user.click(langButton);
    const polishOption = await screen.findByText(/Polish/i);
    await user.click(polishOption);

    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    const hiddenFileInput = screen.getByLabelText(
      /Choose audio file/i,
    ) as HTMLInputElement;
    const chooseFileBtn = screen.getByRole("button", { name: /Choose file/i });

    await user.click(chooseFileBtn);
    fireEvent.change(hiddenFileInput, { target: { files: [file] } });

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText("No transcript found.")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.any(FormData),
      }),
    );

    const formData = (global.fetch as jest.Mock).mock.calls[0][1]
      .body as FormData;
    expect(formData.get("language")).toBe("POLISH");
  }, 10000);

  test("throws error when res.ok is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Server failure",
    });

    render(<AddNewPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Title/i), "Server Error");
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    expect(
      await screen.findByText(/An error occurred during transcription/i),
    ).toBeInTheDocument();
  }, 10000);

  test("handles analysis type change", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transcriptionAnalysis: { transcription: "OK" } }),
    });

    render(<AddNewPage />);
    const user = userEvent.setup();

    const typeButton = screen.getByRole("button", { name: /Song/i });
    await user.click(typeButton);
    const lectureOption = await screen.findByText(/Lecture/i);
    await user.click(lectureOption);

    await user.type(screen.getByLabelText(/Title/i), "Lecture");
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/analysis/lecture"),
      expect.any(Object),
    );
  }, 10000);

  test("Set Language shows alert when no file selected", async () => {
    render(<AddNewPage />);
    const user = userEvent.setup();
    window.alert = jest.fn();

    const setLangBtn = screen.getByRole("button", { name: /Set Language/i });
    await user.click(setLangBtn);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Please select an audio file"),
    );
  });

  test("Set Language alerts when file too large (>50MB)", async () => {
    render(<AddNewPage />);
    const user = userEvent.setup();
    window.alert = jest.fn();

    const bigFile = new File(["a"], "big.mp3", { type: "audio/mpeg" });
    Object.defineProperty(bigFile, "size", { value: 51 * 1024 * 1024 });

    const hiddenFileInput = screen.getByLabelText(
      /Choose audio file/i,
    ) as HTMLInputElement;
    fireEvent.change(hiddenFileInput, { target: { files: [bigFile] } });

    const setLangBtn = screen.getByRole("button", { name: /Set Language/i });
    await user.click(setLangBtn);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("File is too large for auto-detection"),
    );
  });

  test("can add and remove phrase in Advanced Options", async () => {
    render(<AddNewPage />);
    const user = userEvent.setup();

    const advBtn = screen.getByRole("button", { name: /Advanced Options/i });
    await user.click(advBtn);

    const addPhraseBtn = screen.getByRole("button", { name: /\+ Add Phrase/i });
    await user.click(addPhraseBtn);

    const phraseInput = await screen.findByPlaceholderText(/Word or phrase/i);
    await user.type(phraseInput, "important term");

    const removeBtn = screen.getByRole("button", { name: /Remove/i });
    await user.click(removeBtn);

    expect(
      screen.queryByPlaceholderText(/Word or phrase/i),
    ).not.toBeInTheDocument();
  });

  test("onSubmit sets error when user has no sub", async () => {
    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: {},
      isAuthenticated: true,
      isLoading: false,
    });

    render(<AddNewPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Title/i), "No Sub Test");
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Error: User not authenticated/i),
      ).toBeInTheDocument(),
    );
  });

  test("submits only non-empty trimmed phraseList entries", async () => {
    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    const listResponse = { transcriptionAnalysis: { transcription: "OK" } };

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => listResponse });
    (global.fetch as jest.Mock) = mockFetch;

    render(<AddNewPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Advanced Options/i }));
    const addPhraseBtn = screen.getByRole("button", { name: /\+ Add Phrase/i });
    await user.click(addPhraseBtn);
    await user.click(addPhraseBtn);

    const inputs = await screen.findAllByPlaceholderText(/Word or phrase/i);
    await user.type(inputs[0], "  keep  ");
    expect(inputs[1]).toHaveValue("");

    await user.type(screen.getByLabelText(/Title/i), "Phrase Test");
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const fd = mockFetch.mock.calls[0][1].body as FormData;
    const phrases = fd.getAll("phraseList").map((v) => String(v));
    expect(phrases).toEqual(["keep"]);
  });

  test("language detection: JSON language -> sets PL", async () => {
    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: true,
      text: async () => '{"language":"POLISH"}',
    });

    render(<AddNewPage />);
    const user = userEvent.setup();

    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    const setLangBtn = screen.getByRole("button", { name: /Set Language/i });
    await user.click(setLangBtn);

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Polish/i }),
      ).toBeInTheDocument(),
    );
  });

  test("language detection: non-ok response alerts failure", async () => {
    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "ERR",
      text: async () => "Server",
    });
    window.alert = jest.fn();

    render(<AddNewPage />);
    const user = userEvent.setup();
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    const setLangBtn = screen.getByRole("button", { name: /Set Language/i });
    await user.click(setLangBtn);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Failed to detect language"),
      ),
    );
  });

  test("language detection: unknown/empty detection alerts could not detect", async () => {
    const auth = require("@/contexts/AuthContext");
    auth.useAuth.mockReturnValue({
      user: { sub: "u1" },
      isAuthenticated: true,
      isLoading: false,
    });

    (global.fetch as jest.Mock) = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, text: async () => "" });
    window.alert = jest.fn();

    render(<AddNewPage />);
    const user = userEvent.setup();
    const file = new File(["audio"], "test.mp3", { type: "audio/mpeg" });
    fireEvent.change(screen.getByLabelText(/Choose audio file/i), {
      target: { files: [file] },
    });

    const setLangBtn = screen.getByRole("button", { name: /Set Language/i });
    await user.click(setLangBtn);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Could not detect language"),
      ),
    );
  });
});
