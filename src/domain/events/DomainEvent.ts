export abstract class DomainEvent {
  public readonly occurredAt: Date;
  constructor(public readonly eventName: string) {
    this.occurredAt = new Date();
  }
}
