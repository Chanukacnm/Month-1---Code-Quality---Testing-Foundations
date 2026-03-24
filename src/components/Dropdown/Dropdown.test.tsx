import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";
import "@testing-library/jest-dom";

const items = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("Dropdown", () => {
  describe("rendering", () => {
    it("renders correctly with placeholder", () => {
      render(<Dropdown items={items} placeholder="Choose an option" />);
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("renders correctly with selected value", () => {
      render(<Dropdown items={items} value="2" />);
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Dropdown items={items} label="Dropdown Label" />);
      expect(screen.getByText("Dropdown Label")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens and closes dropdown on click", () => {
      render(<Dropdown items={items} />);
      const trigger = screen.getByRole("combobox");
      
      fireEvent.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      
      fireEvent.click(trigger);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("selects an item and calls onChange", () => {
      const handleChange = jest.fn();
      render(<Dropdown items={items} onChange={handleChange} />);
      
      fireEvent.click(screen.getByRole("combobox"));
      fireEvent.click(screen.getByText("Option 2"));
      
      expect(handleChange).toHaveBeenCalledWith("2");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument(); // Uncontrolled state update works
    });

    it("closes when clicking outside", () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <Dropdown items={items} />
        </div>
      );
      
      fireEvent.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      
      fireEvent.mouseDown(screen.getByTestId("outside"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("toggles via keyboard", () => {
      render(<Dropdown items={items} />);
      const trigger = screen.getByRole("combobox");
      
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "Enter", code: "Enter" });
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      
      fireEvent.keyDown(trigger, { key: "Escape", code: "Escape" });
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
