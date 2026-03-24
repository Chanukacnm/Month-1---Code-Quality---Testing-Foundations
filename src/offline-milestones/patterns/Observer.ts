// src/offline-milestones/patterns/Observer.ts
export interface Observer {
  update(state: string): void;
}

export class Subject {
  private observers: Observer[] = [];
  private state: string = "initial";

  attach(observer: Observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  changeState(newState: string) {
    this.state = newState;
    this.notify();
  }
}

export class ConcreteObserver implements Observer {
  public receivedState: string | null = null;
  
  update(state: string): void {
    this.receivedState = state;
  }
}
