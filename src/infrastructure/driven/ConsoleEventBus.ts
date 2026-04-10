import { DomainEvent } from '../../domain/events/DomainEvent';
import { EventBus } from '../../domain/ports/output.ports';

export class ConsoleEventBus implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach(e => console.log(`[Event] ${e.eventName} at ${e.occurredAt.toISOString()}`));
  }
}
