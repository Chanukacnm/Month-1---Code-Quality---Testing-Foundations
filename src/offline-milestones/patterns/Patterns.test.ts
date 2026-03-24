// src/offline-milestones/patterns/Patterns.test.ts
import { Subject, ConcreteObserver } from "./Observer";
import { WindowsDialog, MacOSDialog } from "./Factory";
import { ShoppingCart, CreditCardPayment, PayPalPayment } from "./Strategy";

describe("Design Patterns Offline Milestone", () => {
  describe("Observer Pattern", () => {
    it("notifies attached observers when state changes", () => {
      const subject = new Subject();
      const obs1 = new ConcreteObserver();
      subject.attach(obs1);
      
      subject.changeState("Updated");
      expect(obs1.receivedState).toBe("Updated");
      
      subject.detach(obs1);
      subject.changeState("New State");
      expect(obs1.receivedState).toBe("Updated"); // Unchanged after detach
    });
  });

  describe("Factory Pattern", () => {
    it("creates dialogs depending on the factory subclass used", () => {
      const winDialog = new WindowsDialog();
      expect(winDialog.renderDialog()).toBe("Dialog showing: Render a button in Windows style");

      const macDialog = new MacOSDialog();
      expect(macDialog.renderDialog()).toBe("Dialog showing: Render a button in MacOS style");
    });
  });

  describe("Strategy Pattern", () => {
    it("swaps payment strategies successfully at runtime", () => {
      const cart = new ShoppingCart(new CreditCardPayment());
      expect(cart.checkout(50)).toBe("Paid 50 using Credit Card");

      cart.setStrategy(new PayPalPayment());
      expect(cart.checkout(50)).toBe("Paid 50 using PayPal");
    });
  });
});
