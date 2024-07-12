import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  AGE_ERROR_MESSAGE,
  GENERIC_MANDATORY_MESSAGE,
  INVALID_ID_MESSAGE
} from "../validation-messages.json";
import { UniqueEmailValidation } from "./unique-email-validation";
import { DOBValidation } from "./date-of-birth-validation";
import { IdExistsValidation } from "../id-exists-validation";

const UserUpdateSchema = {
  _id: {
    in: ['params'],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (_id: string) => {
        try {
          const count = await IdExistsValidation.validate(_id, 'users');
          if (count === 0) throw new Error(INVALID_ID_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
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
    optional: true,
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
    optional: true,
    isStrongPassword: true,
    errorMessage: INVALID_PASSWORD_MESSAGE,
  },
  role: {
    in: ["body"],
    optional: true,
    isAlpha: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  contactNumber: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  dateOfBirth: {
    in: ["body"],
    optional: true,
    custom: {
      options: (dateOfBirth: string) =>
        new Date(dateOfBirth) <= new Date(DOBValidation.getMinimumDOB()),
    },
    errorMessage: AGE_ERROR_MESSAGE,
  },
  firstName: {
    in: ["body"],
    optional: true,
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
    optional: true,
    isAlpha: true
  },
};

export { UserUpdateSchema };
