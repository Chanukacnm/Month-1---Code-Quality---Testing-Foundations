/// <reference types="cypress" />

describe("React Component Library E2E", () => {
  beforeEach(() => {
    // Assuming Vite dev server runs on port 5173 by default
    cy.visit("http://localhost:5173");
  });

  it("completes a full component interaction flow", () => {
    // 1. Verify Card renders
    cy.get(".card").should("be.visible");

    // 2. Interact with Toggle component
    cy.get(".toggle-track").first().click();
    cy.get(".toggle-track").first().should("have.class", "toggle-checked");
    // Accessibility check
    cy.get(".toggle-track").first().should("have.attr", "aria-checked", "true");

    // 3. Interact with Input and Button
    cy.get("input[type='text']").first().type("Hello Cypress");
    cy.get("button").contains("Primary Button").click();

    // 4. Interact with Dropdown
    cy.get(".dropdown-trigger").first().click();
    cy.get(".dropdown-menu").should("be.visible");
    cy.get(".dropdown-item").first().click();
    cy.get(".dropdown-menu").should("not.exist");

    // 5. Interact with Tabs
    cy.get(".tab-button").eq(1).click();
    cy.get(".tab-button").eq(1).should("have.class", "tab-active");

    // 6. Interact with Modal
    // Assuming there's a button opening a modal
    cy.get("button").contains("Open Modal").click();
    cy.get(".modal").should("be.visible");
    cy.get(".modal-close").click();
    cy.get(".modal").should("not.exist");
  });
});
