import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";
import "@testing-library/jest-dom";

describe("Alert", () => {
  describe("rendering", () => {
    it("renders correctly with default props", () => {
      render(<Alert>Info Message</Alert>);
      expect(screen.getByText("Info Message")).toBeInTheDocument();
      // Test the default class variant
      const alertDiv = screen.getByText("Info Message").parentElement!;
      expect(alertDiv).toHaveClass("alert-info");
    });

    it("renders different variants", () => {
      render(<Alert variant="success">Success Message</Alert>);
      const alertDiv = screen.getByText("Success Message").parentElement!;
      expect(alertDiv).toHaveClass("alert-success");
    });

    it("renders dismiss button when dismissible is true", () => {
      render(
        <Alert dismissible>
          Dismissible Message
        </Alert>
      );
      expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("hides the alert and calls onDismiss when dismissed", () => {
      const handleDismiss = jest.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Close Me
        </Alert>
      );
      
      const closeBtn = screen.getByRole("button", { name: "Dismiss alert" });
      fireEvent.click(closeBtn);
      
      expect(screen.queryByText("Close Me")).not.toBeInTheDocument();
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("does not render close button when dismissible is false", () => {
      render(<Alert dismissible={false}>No Close Btn</Alert>);
      expect(screen.queryByRole("button", { name: "Dismiss alert" })).not.toBeInTheDocument();
    });
  });
});
