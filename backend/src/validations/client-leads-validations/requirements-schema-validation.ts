import { INVALID_REQUIREMENT } from "../validation-messages.json";

const RequirementSchema = {
  requirements: {
    in: ["params"],
    optional: false,
    isAlpha: true,
    errorMessage: INVALID_REQUIREMENT,
  },
};

export { RequirementSchema };
