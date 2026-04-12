import { render, screen, act } from "@testing-library/react";
import AudioAnalyzerFlow from "./page";
import React from "react";

jest.mock("lucide-react", () => ({
  ArrowDown: () => <div data-testid="arrow-down" />,
  Sparkles: () => <div data-testid="sparkles" />,
  Zap: () => <div data-testid="zap" />,
  Shield: () => <div data-testid="shield" />,
  Globe: () => <div data-testid="globe" />,
  Check: () => <div data-testid="check" />,
}));

describe("AudioAnalyzerFlow Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test("renders header and main sections", () => {
    render(<AudioAnalyzerFlow />);

    expect(screen.getByText(/How it works/i)).toBeInTheDocument();
    expect(screen.getByText(/Audio Analysis Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Supported audio types/i)).toBeInTheDocument();
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument();
  });

  test("renders all 4 process steps", () => {
    render(<AudioAnalyzerFlow />);

    expect(screen.getByText("Select audio type")).toBeInTheDocument();
    expect(screen.getByText("Upload & Transcription")).toBeInTheDocument();
    expect(screen.getByText("AI Analysis")).toBeInTheDocument();
    expect(screen.getAllByText("Summary")[0]).toBeInTheDocument();
  });

  test("changes active step automatically over time", () => {
    render(<AudioAnalyzerFlow />);

    const step1 = screen.getByText("Select audio type").closest(".relative");
    expect(step1).toHaveClass("border-primary");

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    const step2 = screen
      .getByText("Upload & Transcription")
      .closest(".relative");
    expect(step2).toHaveClass("border-primary");
    expect(step1).not.toHaveClass("border-primary");
  });

  test("renders all audio types with outcomes", () => {
    render(<AudioAnalyzerFlow />);

    const types = ["Song", "Conversation", "Lecture", "Audiobook"];
    types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    expect(screen.getByText("Title & Artist")).toBeInTheDocument();
    expect(screen.getByText("Emotions & Themes")).toBeInTheDocument();
  });

  test("renders technologies section", () => {
    render(<AudioAnalyzerFlow />);

    expect(screen.getByText("Azure AI")).toBeInTheDocument();
    expect(screen.getByText("GPT-4")).toBeInTheDocument();
    expect(screen.getByText("Shazam API")).toBeInTheDocument();
    expect(screen.getByText("Custom algorithms")).toBeInTheDocument();
  });

  test("CTA button is visible and has text", () => {
    render(<AudioAnalyzerFlow />);
    const ctaButton = screen.getByRole("button", { name: /Start now/i });
    expect(ctaButton).toBeInTheDocument();
  });

  test("clears interval on component unmount", () => {
    const { unmount } = render(<AudioAnalyzerFlow />);
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
