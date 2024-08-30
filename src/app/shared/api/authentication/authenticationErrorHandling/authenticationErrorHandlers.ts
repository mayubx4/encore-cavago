import {
  IncorrectCurrentPassword,
} from "./authenticationErrorClasses";

export const authenticationErrorClasses = {
  IncorrectCurrentPassword,
};

export function handleUpdatePasswordErrors(error: any) {
  if (error.response?.data.error === 'Incorrect current password.') {
    throw new IncorrectCurrentPassword({ message: error.response?.data.error });
  }
}
