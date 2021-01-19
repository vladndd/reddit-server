import { RegisterInput } from "../resolvers/RegisterInput";
import * as EmailValidator from "email-validator";

export const validateRegsiter = (options: RegisterInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (EmailValidator.validate(options.email) === false) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  return null;
};
