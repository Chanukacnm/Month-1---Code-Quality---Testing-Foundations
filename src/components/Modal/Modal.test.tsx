import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  describe("rendering", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <Modal isOpen={false} onClose={jest.fn()}>
          Modal Content
        </Modal>
      );
      expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });

    it("renders content and title when isOpen is true", () => {
      render(
        <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
          Modal Content
        </Modal>
      );
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("calls onClose when close button is clicked", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Modal Content
        </Modal>
      );
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when overlay is clicked", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Modal Content
        </Modal>
      );
      // The overlay is the first div, parent of the dialog
      // Actually we can query it by looking for the wrapper
      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement!;
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when clicking inside the modal", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Modal Content
        </Modal>
      );
      fireEvent.click(screen.getByText("Modal Content"));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("calls onClose when Escape key is pressed", () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          Modal Content
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not crash if onClose is undefined (missing null check)", () => {
      // Simulate missing onClose
      render(
        <Modal isOpen={true} onClose={undefined as any}>
          Modal Content
        </Modal>
      );
      // This should not throw an error now
      expect(() => {
        fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
      }).not.toThrow();
    });
  });
});
