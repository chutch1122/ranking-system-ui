export class Optional<T> {
  private constructor(private item: T) {
  }

  static of<T>(item: T): Optional<T> {
    return new Optional<T>(item);
  }

  static empty(): Optional<void> {
    return new Optional<void>(null);
  }

  get(): T {
    if (this.item == null) throw null;

    return this.item;
  }

  isPresent(): boolean {
    return this.item !== null;
  }

  ifPresent(callback: (value: T) => void): void {
    if (this.item == null) return;

    callback(this.item);
  }
}
