import {
  GENERIC_MANDATORY_MESSAGE,
  INVALID_ID_MESSAGE,
} from "../validation-messages.json";
import { UniqueBandValidation } from "./unique-band-validation";

const CreateBandSchema = {
  bandName: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  bandType: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  bandDescription: {
    in: ["body"],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  image_URL: {
    in: ['body'],
    optional: false,
    errorMessage: GENERIC_MANDATORY_MESSAGE,
  },
  idBandManager: {
    in: ["body"],
    optional: false,
    custom: {
      options: async (idBandManager: string) => {
        try {
          await UniqueBandValidation.validateBand(idBandManager);
        } catch (e) {
          throw e;
        }
      },
    },
    errorMessage: INVALID_ID_MESSAGE,
  },
  artists: {
    in: ["body"],
    optional: true,
  },
};

export { CreateBandSchema };
