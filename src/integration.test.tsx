import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { Alert } from "./components/Alert/Alert";
import { Modal } from "./components/Modal/Modal";
import "@testing-library/jest-dom";
import { useState } from "react";

// Mock out a ContactForm to test them working together
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState("Developer");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
      <form onSubmit={handleSubmit} role="form">
        <Input label="Name" required placeholder="Enter name" />
        <Dropdown
          label="Role"
          items={[
            { value: "Developer", label: "Developer" },
            { value: "Designer", label: "Designer" },
          ]}
          value={role}
          onChange={setRole}
        />
        <Button onClick={() => setIsModalOpen(true)}>
          Preview Terms
        </Button>
        <Button onClick={(e) => { e.preventDefault(); setSubmitted(true); }}>Submit</Button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Terms">
        Please agree to our terms.
      </Modal>
    </div>
  );
};

describe("Integration Tests", () => {
  it("submits the form and displays success alert", () => {
    render(<ContactForm />);
    
    // Fill out the input
    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John Doe" } });
    
    // Select dropdown
    const dropdown = screen.getByRole("combobox");
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByText("Designer"));
    
    // Submit form
    const submitBtn = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);
    
    expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
  });

  it("opens the modal and closes it via overlay", () => {
    render(<ContactForm />);
    
    // Open Modal
    const previewBtn = screen.getByRole("button", { name: "Preview Terms" });
    fireEvent.click(previewBtn);
    expect(screen.getByText("Please agree to our terms.")).toBeInTheDocument();
    
    // Close Modal
    const closeBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    expect(screen.queryByText("Please agree to our terms.")).not.toBeInTheDocument();
  });

  it("dropdown updates correctly affecting its visual state", () => {
    render(<ContactForm />);
    const dropdown = screen.getByRole("combobox");
    
    fireEvent.click(dropdown);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Designer" }));
    
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    // The dropdown toggle trigger should display the selected role
    expect(dropdown).toHaveTextContent("Designer");
  });
});
