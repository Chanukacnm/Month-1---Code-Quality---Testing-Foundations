import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  describe("rendering", () => {
    it("renders correctly with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("btn", "btn-primary");
    });

    it("shows loading state", () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    });

    it("applies variant styles", () => {
      render(<Button variant="danger">Delete</Button>);
      expect(screen.getByRole("button")).toHaveClass("btn-danger");
    });

    it("supports custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("interactions", () => {
    it("handles click events", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("respects disabled prop", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
