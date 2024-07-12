import { Router } from "express";
import { BandsController } from "../controllers/bands-controller";
import { SchemaMiddleware } from "../middlewares/schema-middleware";
import { SchemaValidationErrorMiddleware } from "../middlewares/schema-validation-error-middleware";
import { BandIdSchema } from "../validations/band-validations/band-id-schema-validation";
import { CreateBandSchema } from "../validations/band-validations/create-band-validation";
import { UpdateBandByIdSchema } from "../validations/band-validations/update-band-by-id-schema-validation";

class BandsRoutes {
  static getBandsRoutes(): Router {
    const router = Router();

    router.get("/", BandsController.getBands);

    router.get(
      "/id/:_id",
      SchemaMiddleware.validate(BandIdSchema),
      SchemaValidationErrorMiddleware.validate,
      BandsController.getBandById
    );

    router.post(
      "/",
      SchemaMiddleware.validate(CreateBandSchema),
      SchemaValidationErrorMiddleware.validate,
      BandsController.createBand
    );

    router.put(
      "/id/:_id",
      SchemaMiddleware.validate(UpdateBandByIdSchema),
      SchemaValidationErrorMiddleware.validate,
      BandsController.updateBandById
    );

    router.delete(
      "/id/:_id",
      SchemaMiddleware.validate(BandIdSchema),
      SchemaValidationErrorMiddleware.validate,
      BandsController.deleteBandById
    );

    return router;
  }
}
export { BandsRoutes };
