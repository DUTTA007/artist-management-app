import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

class SchemaValidationErrorMiddleware {
  static validate(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  }
}

export { SchemaValidationErrorMiddleware };
