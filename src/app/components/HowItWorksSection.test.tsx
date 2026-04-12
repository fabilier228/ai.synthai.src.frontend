import { render, screen } from "@testing-library/react";
import HowItWorksSection from "./HowItWorksSection";
import React from "react";

describe("HowItWorksSection Component", () => {
  test("renders section heading", () => {
    render(<HowItWorksSection />);
    expect(screen.getByText(/How it works\?/i)).toBeInTheDocument();
  });

  test("renders all four steps with correct titles", () => {
    render(<HowItWorksSection />);

    const titles = [
      "Step 1 Choose your model",
      "Step 2 Upload audio",
      "Step 3 Let our AI do the work",
      "Step 4 Get summary and transcript",
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("displays correct step numbers (1-4)", () => {
    render(<HowItWorksSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test("each step number has appropriate styling class (circle)", () => {
    render(<HowItWorksSection />);

    const stepNumbers = screen.getByText("1");
    expect(stepNumbers).toHaveClass("rounded-full");
    expect(stepNumbers).toHaveClass("bg-secondary");
  });

  test("renders descriptions for steps", () => {
    render(<HowItWorksSection />);

    expect(
      screen.getAllByText(/Securely upload any audio or video file/i),
    ).toHaveLength(2);

    expect(
      screen.getByText(/accurately transcribing and identifying key points/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Receive a precise transcript and a clean/i),
    ).toBeInTheDocument();
  });
});
