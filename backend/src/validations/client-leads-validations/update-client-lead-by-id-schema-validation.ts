import { IdExistsValidation } from "../id-exists-validation";
import {
  INVALID_ID_MESSAGE,
  ID_DOES_NOT_EXIST_MESSAGE,
  GENERIC_MANDATORY_MESSAGE,
  INVALID_IS_PENDING,
  INVALID_IS_APPROVED,
} from "../validation-messages.json";

const UpdateClientLeadByIdSchema = {
  _id: {
    in: ["params"],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (_id: string) => {
        try {
          const count = await IdExistsValidation.validate(_id, "clientLeads");
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
  },
  requirements: {
    in: ["body"],
    optional: true,
  },
  contact: {
    in: ["body"],
    optional: true,
  },
  music: {
    in: ["body"],
    optional: true,
  },
  location: {
    in: ["body"],
    optional: true,
  },
  agreed_wage: {
    in: ["body"],
    optional: true,
  },
  band_id: {
    in: ["body"],
    optional: true,
    custom: {
      options: async (band_id: string) => {
        try {
          if (band_id !== "") {
            const count = await IdExistsValidation.validate(band_id, "users");
            if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
          }
        } catch (e) {
          throw e;
        }
      },
    },
  },
  client_id: {
    in: ["body"],
    optional: true,
    custom: {
      options: async (client_id: string) => {
        try {
          if (client_id !== "") {
            const count = await IdExistsValidation.validate(client_id, "users");
            if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
          }
        } catch (e) {
          throw e;
        }
      },
    },
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
  end_date: {
    in: ["body"],
    optional: true,
  },
  is_pending: {
    in: ["body"],
    optional: true,
    isBoolean: true,
    errorMessage: INVALID_IS_PENDING,
  },
};

export { UpdateClientLeadByIdSchema };
