import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import "@testing-library/jest-dom";

describe("Input", () => {
  describe("rendering", () => {
    it("renders correctly with default props", () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("renders with label and asterisk if required", () => {
      render(<Input label="Username" required />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("shows error message and applies error class", () => {
      render(<Input label="Email" error="Invalid email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveClass("input-error");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    });
  });

  describe("interactions", () => {
    it("updates value on change", () => {
      const handleChange = jest.fn();
      render(<Input label="Name" onChange={handleChange} />);
      const input = screen.getByLabelText("Name");
      fireEvent.change(input, { target: { value: "John" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("handles focus and blur events", () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      render(<Input label="Name" onFocus={handleFocus} onBlur={handleBlur} />);
      const input = screen.getByLabelText("Name");
      
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("handles different input types", () => {
      render(<Input type="password" placeholder="Password" />);
      expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "password");
    });

    it("handles gracefully when no label is provided but error is present", () => {
      render(<Input error="Some error" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Some error");
    });
  });
});
