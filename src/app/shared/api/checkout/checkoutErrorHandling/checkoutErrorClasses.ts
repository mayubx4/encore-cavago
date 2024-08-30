export class IncorrectPromoCode extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'IncorrectPromoCode';
  }
}

export class MissingSubActivityId extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'MissingSubActivityId';
  }
}

export class InvalidEmailError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidEmailError';
  }
}

export class InvalidSuccessURLError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidSuccessURLError';
  }
}

export class InvalidCancelURLError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidCancelURLError';
  }
}

export class InvalidAmountError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidAmountError';
  }
}

export class InvalidCurrencyError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidCurrencyError';
  }
}

export class InvalidQuantityError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'InvalidQuantityError';
  }
}

export class PaymentPendingError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'PaymentPendingError';
  }
}

export class BookingFailedError extends Error {
  constructor({ message }: { message: string }) {
    super(message);
    this.name = 'BookingFailedError';
  }
}
