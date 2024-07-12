import { ID_DOES_NOT_EXIST_MESSAGE, INVALID_ID_MESSAGE } from "../validation-messages.json";
import { IdExistsValidation } from "../id-exists-validation";

const FreelancerIdSchema = {
  freelancer_id: {
    in: ["params"],
    optional: false,
    isHexadecimal: true,
    isMongoId: true,
    custom: {
      options: async (freelancer_id: string) => {
        try {
          const count = await IdExistsValidation.validate(freelancer_id, "users");
          if (count === 0) throw new Error(ID_DOES_NOT_EXIST_MESSAGE);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
};

export { FreelancerIdSchema };
