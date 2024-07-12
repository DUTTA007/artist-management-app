import { IdExistsValidation } from "../id-exists-validation";
import {
  GENERIC_MANDATORY_MESSAGE,
  ID_DOES_NOT_EXIST_MESSAGE,
  INVALID_ID_MESSAGE,
  INVALID_IS_APPROVED,
} from "../validation-messages.json";

const UpdateArtistRequestByIdSchema = {
  _id: {
    in: ["params"],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (_id: string) => {
        try {
          const count = await IdExistsValidation.validate(
            _id,
            "artistRequests"
          );
          if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
  type: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  location: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  requirements: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  contact: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  music: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  agreed_wage: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  end_date: {
    in: ["body"],
    optional: true,
  },
  freelancer_id: {
    in: ["body"],
    optional: true,
    custom: {
      options: async (freelancer_id: string) => {
        try {
          if (freelancer_id !== "") {
            const count = await IdExistsValidation.validate(
              freelancer_id,
              "users"
            );
            if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
          }
        } catch (e) {
          throw e;
        }
      },
    },
  },
  is_approved: {
    in: ["body"],
    optional: true,
    isBoolean: true,
    errorMessage: INVALID_IS_APPROVED,
  },
  start_date: {
    in: ["body"],
    optional: true,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
};

export { UpdateArtistRequestByIdSchema };
