import { INVALID_ID_MESSAGE } from "../validation-messages.json";
import { IdExistsValidation } from "../id-exists-validation";

const IdSchema = {
  _id: {
    in: ["params"],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (_id: string) => {
        try {
          const count = await IdExistsValidation.validate(_id, "users");
          if (count === 0) throw new Error(INVALID_ID_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
};

export { IdSchema };
