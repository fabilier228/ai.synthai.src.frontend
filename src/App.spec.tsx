import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders SynthAI Frontend heading", () => {
  render(<App />);
  expect(screen.getByText(/SynthAI Frontend/i)).toBeInTheDocument();
});
