// src/offline-milestones/patterns/Factory.ts
export interface Button {
  render(): string;
}

export class WindowsButton implements Button {
  render(): string {
    return "Render a button in Windows style";
  }
}

export class MacOSButton implements Button {
  render(): string {
    return "Render a button in MacOS style";
  }
}

export abstract class Dialog {
  abstract createButton(): Button;

  renderDialog(): string {
    const okButton = this.createButton();
    return `Dialog showing: ${okButton.render()}`;
  }
}

export class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

export class MacOSDialog extends Dialog {
  createButton(): Button {
    return new MacOSButton();
  }
}
