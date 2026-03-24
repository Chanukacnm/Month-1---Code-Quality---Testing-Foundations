// src/offline-milestones/patterns/Strategy.ts
export interface PaymentStrategy {
  pay(amount: number): string;
}

export class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): string {
    return `Paid ${amount} using Credit Card`;
  }
}

export class PayPalPayment implements PaymentStrategy {
  pay(amount: number): string {
    return `Paid ${amount} using PayPal`;
  }
}

export class ShoppingCart {
  private paymentStrategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number): string {
    return this.paymentStrategy.pay(amount);
  }
}
