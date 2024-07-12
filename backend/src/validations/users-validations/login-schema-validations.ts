import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  EMAIL_DOES_NOT_EXIST_MESSAGE
} from "../validation-messages.json";
import { UniqueEmailValidation } from "./unique-email-validation";

const LoginSchema = {
  email: {
    in: ["body"],
    isEmail: true,
    optional: false,
    errorMessage: INVALID_EMAIL_MESSAGE,
    normalizeEmail: {
      gmail_remove_dots: true,
    },
    custom: {
      options: async (email: string) => {
        try {
          const count = await UniqueEmailValidation.validateEmail(email);
          if (count === 0) throw new Error(EMAIL_DOES_NOT_EXIST_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
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
