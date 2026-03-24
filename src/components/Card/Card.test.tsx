import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import "@testing-library/jest-dom";

describe("Card", () => {
  describe("rendering", () => {
    it("renders correctly with default props", () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText("Card Content")).toBeInTheDocument();
    });

    it("renders with title", () => {
      render(<Card title="Test Card">Card Content</Card>);
      expect(screen.getByText("Test Card")).toBeInTheDocument();
    });

    it("renders with image", () => {
      render(
        <Card image="test.jpg" title="Image Card">
          Card Content
        </Card>
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "test.jpg");
      expect(img).toHaveAttribute("alt", "Image Card");
    });

    it("renders with actions", () => {
      render(
        <Card actions={<button>Action</button>}>
          Card Content
        </Card>
      );
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("applies custom className", () => {
      render(<Card className="my-card">Content</Card>);
      // The outermost wrapper has the 'card' and 'my-card' classes
      const content = screen.getByText("Content");
      const card = content.parentElement!;
      expect(card).toHaveClass("card", "my-card");
    });
  });

  describe("edge cases", () => {
    it("handles missing title for image appropriately", () => {
      render(<Card image="test.jpg">Content</Card>);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("alt", "");
    });
  });
});
