export class Greeting {
  private basic: string = "yolo!";
  constructor(private extra: string) {}

  greet() {
    return [this.extra, this.basic].join(", ");
  }
}
