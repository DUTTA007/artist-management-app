import { INVALID_ID_MESSAGE, ID_DOES_NOT_EXIST_MESSAGE } from "../validation-messages.json";
import { IdExistsValidation } from "../id-exists-validation";

const BandIdSchema = {
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
};

export { BandIdSchema };
