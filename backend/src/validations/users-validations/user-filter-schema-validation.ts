import {
    INVALID_FILTER_PARAM,
    INVALID_FILTER_VALUE,
  } from "../validation-messages.json";
  
  const UserFilterSchema = {
    filterParam: {
      in: ["param"],
      optional: false,
      isAlpha: true,
      errorMessage: INVALID_FILTER_PARAM
    },
    value: {
      in: ["param"],
      optional: false,
      errorMessage: INVALID_FILTER_VALUE,
    },
  };
  
  export { UserFilterSchema };
  