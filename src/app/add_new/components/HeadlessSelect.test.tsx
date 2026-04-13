import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeadlessSelect, Option } from "./HeadlessSelect";
import React from "react";

const options: Option[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("HeadlessSelect Component", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    options,
    value: "1",
    onChange: mockOnChange,
    label: "Select Option",
    name: "test-select",
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders label and currently selected option", () => {
    render(<HeadlessSelect {...defaultProps} />);

    expect(screen.getByText("Select Option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("opens options list when button clicked", async () => {
    render(<HeadlessSelect {...defaultProps} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  }, 10000);

  test("calls onChange when selecting a new option", async () => {
    render(<HeadlessSelect {...defaultProps} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    const option2 = screen.getByText("Option 2");
    await userEvent.click(option2);

    expect(mockOnChange).toHaveBeenCalledWith("2");
  }, 10000);

  test("renders error message when provided", () => {
    render(
      <HeadlessSelect
        {...defaultProps}
        error={<span data-testid="error-msg">Required field</span>}
      />,
    );

    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
