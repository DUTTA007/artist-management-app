import {
  GENERIC_MANDATORY_MESSAGE,
  INVALID_IS_PENDING,
  INVALID_IS_APPROVED,
} from "../validation-messages.json";

const CreateClientLeadSchema = {
  type: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  requirements: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  contact: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  music: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  location: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  agreed_wage: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  band_id: {
    in: ["body"],
    optional: true,
  },
  client_id: {
    in: ["body"],
    optional: true,
  },
  freelancer_id: {
    in: ["body"],
    optional: true,
  },
  is_approved: {
    in: ["body"],
    optional: false,
    isBoolean: true,
    errorMessage: INVALID_IS_APPROVED,
  },
  start_date: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  end_date: {
    in: ["body"],
    optional: true,
  },
  is_pending: {
    in: ["body"],
    optional: false,
    isBoolean: true,
    errorMessage: INVALID_IS_PENDING,
  },
};

export { CreateClientLeadSchema };
