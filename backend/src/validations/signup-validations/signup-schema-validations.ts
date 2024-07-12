import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  AGE_ERROR_MESSAGE,
  GENERIC_MANDATORY_MESSAGE,
} from "../validation-messages.json";
import { UniqueEmailValidation } from "./unique-email-validation";
import { DOBValidation } from "./date-of-birth-validation";

const SignUpSchema = {
  address: {
    in: ["body"],
    optional: true,
  },
  "address.city": {
    optional: true,
  },
  "address.country": {
    optional: true,
  },
  "address.pincode": {
    optional: true,
  },
  "address.streetName": {
    optional: true,
  },
  "address.streetNumber": {
    optional: true,
  },
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
          await UniqueEmailValidation.validateEmail(email);
        } catch (e) {
          throw e;
        }
      },
    },
  },
  instrument: {
    in: ["body"],
    optional: true,
  },
  password: {
    in: ["body"],
    optional: false,
    isStrongPassword: true,
    errorMessage: INVALID_PASSWORD_MESSAGE,
  },
  role: {
    in: ["body"],
    optional: false,
    isAlpha: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  contactNumber: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  dateOfBirth: {
    in: ["body"],
    optional: false,
    custom: {
      options: (dateOfBirth: string) =>
        new Date(dateOfBirth) <= new Date(DOBValidation.getMinimumDOB()),
    },
    errorMessage: AGE_ERROR_MESSAGE,
  },
  firstName: {
    in: ["body"],
    optional: false,
    isAlpha: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  imageURL: {
    in: ["body"],
    optional: true,
  },
  companyName: {
    in: ["body"],
    optional: true,
  },
  lastName: {
    in: ["body"],
    optional: false,
    isAlpha: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
};

export { SignUpSchema };
