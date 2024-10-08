// eslint-disable-next-line import/prefer-default-export
export const URLS = {
  getCategories: '/v2/categories/retrieve',
  getActivities: '/v2/customer/activities/filter',
  getActivity: '/v2/customer/activities/id',
  getActivityRating: '/v2/customer/activities/rating?sub_activity_id=',
  getMessagesInbox: '/v2/messages/inbox-users-list',
  getMessages: '/v2/messages/get',
  markRead: '/v2/messages/mark-read',
  sendDirectMessage: '/v2/messages/send-message',
  sendMessage: '/v2/messages/send',
  toggleFvrt: '/v2/customer/activities/toggle-favourite',
  applyPromoCode: '/v2/customer/payment/apply-promo-code',
  getWishlist: '/v2/customer/activities/wish-list',
  getSearchSuggestions: '/v2/customer/search/suggestions',
  login: '/v2/auth/login',
  getUser: '/v2/auth/user',
  updateProfile: '/v2/customer/profile/update',
  loginViaGoogle: '/v2/auth/login/google',
  disconnectGoggle: '/v2/auth/disconnect-google',
  disconnectApple: '/v2/auth/disconnect-apple',
  register: '/v2/auth/register',
  verifyOtp: '/v2/auth/verify-otp',
  getOtp: '/v2/auth/get-otp',
  onResendOtp: '/v2/auth/resend-otp',
  saveCustomerProfile: '/v2/customer/profile',
  updatePassword: '/v2/auth/update-password',
  forgotPasswordOTP: '/v2/auth/forgot-password',
  verifyForgotPasswordOTP: '/v2/auth/verify-otp',
  previousBookings: '/v2/customer/bookings/previous',
  getHostProfile: '/v2/host/profile',
  createSession: '/v2/customer/checkout',
  saveBooking: '/v2/customer/activities/booking',
  getPastActivities: '/v2/customer/bookings/previous',
  getUpcomingBookings: '/v2/customer/bookings/upcoming',
  getPreviousBookings: '/v2/customer/bookings/previous',
  getBookingDetails: '/v2/customer/facility_id/bookings/booking_id/details',
  getInvitations: '/v2/customer/invitations',
  declineInvitation: '/v2/customer/invitations/invitation_id',
};
