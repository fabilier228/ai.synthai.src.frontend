import { render, screen } from "@testing-library/react";
import FeatureSection from "./FeatureSection";
import React from "react";

describe("FeatureSection Component", () => {
  test("renders main section heading", () => {
    render(<FeatureSection />);
    const mainHeading = screen.getByRole("heading", {
      level: 2,
      name: /features/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  test("displays all features defined in features array", () => {
    render(<FeatureSection />);

    const featureTitles = [
      "Accurate Transcriptions",
      "Smart Summaries",
      "Supports Any Audio",
    ];

    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("displays descriptions for each feature", () => {
    render(<FeatureSection />);

    expect(
      screen.getByText(/advanced AI speech recognition/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/capture every key idea/i)).toBeInTheDocument();
    expect(
      screen.getByText(/university lectures to phone calls/i),
    ).toBeInTheDocument();
  });

  test("has correct semantic structure", () => {
    render(<FeatureSection />);

    const h3Headings = screen.getAllByRole("heading", { level: 3 });
    expect(h3Headings).toHaveLength(3);
  });
});
