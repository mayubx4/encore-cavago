import {
  IncorrectPromoCode, MissingSubActivityId, InvalidEmailError, InvalidSuccessURLError,
  InvalidCancelURLError, InvalidAmountError, InvalidCurrencyError, InvalidQuantityError,
  PaymentPendingError, BookingFailedError,
} from "./checkoutErrorClasses";

export const checkoutErrorClasses = {
  IncorrectPromoCode,
  MissingSubActivityId,
  InvalidEmailError,
  InvalidSuccessURLError,
  InvalidCancelURLError,
  InvalidAmountError,
  InvalidCurrencyError,
  InvalidQuantityError,
  PaymentPendingError,
  BookingFailedError,
};

export function handlePromoCodeErrors(error: any) {
  const errorData = error.response?.data;

  if (errorData === 'Invalid promo code.') {
    throw new IncorrectPromoCode({ message: errorData });
  }
  if (errorData?.message === 'The selected sub activity id is invalid.') {
    throw new MissingSubActivityId({ message: errorData?.message });
  }
}

export function handleSessionErrors(error: any) {
  const errorData = error.response?.data;
  
  if (errorData?.message?.includes('The customer email field must be a valid email address.')) {
    throw new InvalidEmailError({ message: errorData?.message });
  }
  if (errorData?.message?.includes('The success url field must be a valid URL.')) {
    throw new InvalidSuccessURLError({ message: errorData?.message });
  }
  if (errorData?.message?.includes('The cancel url field must be a valid URL.')) {
    throw new InvalidCancelURLError({ message: errorData?.message });
  }
  if (errorData?.message?.includes('The line_items.0.amount field must be at least 1.')) {
    throw new InvalidAmountError({ message: errorData?.message });
  }
  if (errorData?.message?.includes('The line_items.0.currency field must be 3 characters.')) {
    throw new InvalidCurrencyError({ message: errorData?.message });
  }
  if (errorData?.message?.includes('The line_items.0.quantity field must be at least 1.')) {
    throw new InvalidQuantityError({ message: errorData?.message });
  }
}

export function handleSaveBookingErrors(error: any) {
  const errorData = error.response?.data;
  if (errorData?.includes('Stripe Error: Payment is pending')) {
    throw new PaymentPendingError({ message: errorData });
  }
  if (errorData?.includes('Booking Failed')) {
    throw new BookingFailedError({ message: errorData });
  }
}
