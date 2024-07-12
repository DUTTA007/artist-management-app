import { INVALID_ROLE } from "../validation-messages.json";

const RoleSchema = {
  role: {
    in: ["params"],
    optional: false,
    isAlpha: true,
    errorMessage: INVALID_ROLE,
  },
};

export { RoleSchema };
