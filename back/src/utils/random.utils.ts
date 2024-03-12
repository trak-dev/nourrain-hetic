export class RandomUtils {
  public static generateNourrainCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }
}
