export class Greeter {
  private basic: string = "yolo!";
  constructor(private extra: string) {}

  talk() {
    return [this.extra, this.basic].join(", ");
  }
}
