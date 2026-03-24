import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "./Tabs";
import "@testing-library/jest-dom";

const tabsData = [
  { label: "Tab 1", content: <div>Content 1</div> },
  { label: "Tab 2", content: <div>Content 2</div> },
  { label: "Tab 3", content: <div>Content 3</div> },
];

describe("Tabs", () => {
  describe("rendering", () => {
    it("renders all tab labels", () => {
      render(<Tabs tabs={tabsData} />);
      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
    });

    it("renders the first tab content by default", () => {
      render(<Tabs tabs={tabsData} />);
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });

    it("renders custom defaultIndex content", () => {
      render(<Tabs tabs={tabsData} defaultIndex={1} />);
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("switches tabs and calls onChange with correct index", () => {
      const handleChange = jest.fn();
      render(<Tabs tabs={tabsData} onChange={handleChange} />);
      
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      fireEvent.click(tab2);
      
      expect(handleChange).toHaveBeenCalledWith(1);
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("handles empty tabs array gracefully", () => {
      render(<Tabs tabs={[]} />);
      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getByRole("tablist").childNodes.length).toBe(0);
    });

    it("handles gracefully out of bounds defaultIndex", () => {
      render(<Tabs tabs={tabsData} defaultIndex={99} />);
      // Should not crash and basically render no content
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });
});
