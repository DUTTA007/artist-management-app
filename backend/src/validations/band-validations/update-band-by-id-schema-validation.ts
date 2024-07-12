import { IdExistsValidation } from "../id-exists-validation";
import {
  INVALID_ID_MESSAGE,
  ID_DOES_NOT_EXIST_MESSAGE,
} from "../validation-messages.json";

const UpdateBandByIdSchema = {
  _id: {
    in: ["params"],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (_id: string) => {
        try {
          const count = await IdExistsValidation.validate(_id, "band");
          if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
  bandName: {
    in: ["body"],
    optional: true,
  },
  bandType: {
    in: ["body"],
    optional: true,
  },
  bandDescription: {
    in: ["body"],
    optional: true,
  },
  image_URL: {
    in: ['body'],
    optional: true
  },
  idBandManager: {
    in: ["body"],
    optional: true,
    custom: {
      options: async (idBandManager: string) => {
        try {
          const count = await IdExistsValidation.validate(
            idBandManager,
            "users"
          );
          if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
  },
  artists: {
    in: ["body"],
    optional: true,
  },
};

export { UpdateBandByIdSchema };
