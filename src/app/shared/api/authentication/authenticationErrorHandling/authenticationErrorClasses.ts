export class IncorrectCurrentPassword extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'IncorrectCurrentPassword';
  }
}
