export class OrderCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly userId: number,
    public readonly email: string,
  ) { }

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      userId: this.userId,
      email: this.email,
    });
  }
}
