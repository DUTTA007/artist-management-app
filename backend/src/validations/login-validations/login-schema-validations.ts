import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
} from "../validation-messages.json";

const LoginSchema = {
  email: {
    in: ["body"],
    isEmail: true,
    optional: false,
    errorMessage: INVALID_EMAIL_MESSAGE,
    normalizeEmail: {
      gmail_remove_dots: true,
    },
  },
  password: {
    in: ["body"],
    optional: false,
    isStrongPassword: true,
    errorMessage: INVALID_PASSWORD_MESSAGE,
  },
};

export { LoginSchema };
