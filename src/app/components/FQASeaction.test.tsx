import { render, screen, fireEvent } from "@testing-library/react";
import FQASection from "./FQASeaction";
import React from "react";

describe("FQASection Component", () => {
  test("renders FAQ heading", () => {
    render(<FQASection />);
    expect(
      screen.getByText(/FAQ \(Frequently Asked Questions\)/i),
    ).toBeInTheDocument();
  });

  test("displays all questions but hides answers initially", () => {
    render(<FQASection />);

    expect(
      screen.getByText(/What audio formats do you support\?/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Is my data secure\?/i)).toBeInTheDocument();

    expect(
      screen.queryByText(/We support a wide range of audio/i),
    ).not.toBeInTheDocument();
  });

  test("expands answer when question is clicked", () => {
    render(<FQASection />);

    const firstQuestion = screen.getByText(
      /What audio formats do you support\?/i,
    );

    fireEvent.click(firstQuestion);

    expect(
      screen.getByText(/We support a wide range of audio/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/A:/)).toBeInTheDocument();
  });

  test("collapses answer when clicked again", () => {
    render(<FQASection />);

    const questionText = screen.getByText(/Is my data secure\?/i);

    fireEvent.click(questionText);
    expect(
      screen.getByText(/All data is encrypted both in transit/i),
    ).toBeInTheDocument();

    fireEvent.click(questionText);
    expect(
      screen.queryByText(/All data is encrypted both in transit/i),
    ).not.toBeInTheDocument();
  });

  test("allows expanding multiple questions at once", () => {
    render(<FQASection />);

    const question1 = screen.getByText(/What audio formats do you support\?/i);
    const question2 = screen.getByText(/Is my data secure\?/i);

    fireEvent.click(question1);
    fireEvent.click(question2);

    expect(
      screen.getByText(/We support a wide range of audio/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/All data is encrypted both in transit/i),
    ).toBeInTheDocument();
  });

  test("changes ExpandMore icon to ExpandLess when clicked", () => {
    const { container } = render(<FQASection />);

    const toggleButton = screen.getAllByRole("button")[0];

    const expandMoreIcon = container.querySelector(
      '[data-testid="ExpandMoreIcon"]',
    );
    expect(expandMoreIcon).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const expandLessIcon = container.querySelector(
      '[data-testid="ExpandLessIcon"]',
    );
    expect(expandLessIcon).toBeInTheDocument();
  });
});
