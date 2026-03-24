import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";
import "@testing-library/jest-dom";

describe("Toggle", () => {
  describe("rendering", () => {
    it("renders default unchecked state", () => {
      render(<Toggle />);
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    });

    it("renders checked state", () => {
      render(<Toggle checked={true} />);
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    });

    it("renders with label", () => {
      render(<Toggle label="Enable Feature" />);
      expect(screen.getByText("Enable Feature")).toBeInTheDocument();
      expect(screen.getByRole("switch")).toHaveAttribute("aria-label", "Enable Feature");
    });
  });

  describe("interactions", () => {
    it("toggles state on click and calls onChange", () => {
      const handleChange = jest.fn();
      render(<Toggle onChange={handleChange} />);
      
      const switchEl = screen.getByRole("switch");
      fireEvent.click(switchEl);
      
      expect(switchEl).toHaveAttribute("aria-checked", "true");
      expect(handleChange).toHaveBeenCalledWith(true);
      
      fireEvent.click(switchEl);
      expect(switchEl).toHaveAttribute("aria-checked", "false");
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it("toggles state via keyboard", () => {
      const handleChange = jest.fn();
      render(<Toggle onChange={handleChange} />);
      
      const switchEl = screen.getByRole("switch");
      switchEl.focus();
      
      fireEvent.keyDown(switchEl, { key: "Enter", code: "Enter" });
      expect(handleChange).toHaveBeenCalledWith(true);
      
      fireEvent.keyDown(switchEl, { key: " ", code: "Space" });
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe("edge cases", () => {
    it("does not toggle or call onChange when disabled", () => {
      const handleChange = jest.fn();
      render(<Toggle disabled onChange={handleChange} />);
      
      const switchEl = screen.getByRole("switch");
      
      fireEvent.click(switchEl);
      expect(handleChange).not.toHaveBeenCalled();
      
      // Disabled focus state is handled via tabIndex
      expect(switchEl).toHaveAttribute("tabIndex", "-1");
    });
  });
});
