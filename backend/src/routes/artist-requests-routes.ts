import { Router } from "express";
import { ArtistRequestsController } from "../controllers/artist-requests-controller";
import { SchemaMiddleware } from "../middlewares/schema-middleware";
import { SchemaValidationErrorMiddleware } from "../middlewares/schema-validation-error-middleware";
import { ArtistRequestIdSchema } from "../validations/artist-requests-validations/artist-request-id-schema-validation";
import { CreateArtistRequestSchema } from "../validations/artist-requests-validations/create-artist-request-schema-validation";
import { FreelancerIdSchema } from "../validations/artist-requests-validations/freelancer-id-schema-validation";
import { UpdateArtistRequestByIdSchema } from "../validations/artist-requests-validations/update-artist-request-by-id-schema-validation";

class ArtistRequestsRoutes {
  static getArtistRequestsRoutes(): Router {
    const router = Router();

    router.get("/", ArtistRequestsController.getAllArtistRequests);

    router.get(
      "/id/:_id",
      SchemaMiddleware.validate(ArtistRequestIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ArtistRequestsController.getArtistRequestById
    );

    router.get(
      "/freelancerId/:freelancer_id",
      SchemaMiddleware.validate(FreelancerIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ArtistRequestsController.getArtistRequestByFreelancerId
    );

    router.get(
      "/pending",
      ArtistRequestsController.getAllPendingRequests
    );

    router.get(
      "/approved",
      ArtistRequestsController.getAllApprovedRequests
    );

    router.post(
      "/",
      SchemaMiddleware.validate(CreateArtistRequestSchema),
      SchemaValidationErrorMiddleware.validate,
      ArtistRequestsController.createArtistRequest
    );

    router.put(
      "/id/:_id",
      SchemaMiddleware.validate(UpdateArtistRequestByIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ArtistRequestsController.updateArtistRequestById
    );

    router.delete(
      "/id/:_id",
      SchemaMiddleware.validate(ArtistRequestIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ArtistRequestsController.deleteArtistRequestById
    );

    return router;
  }
}

export { ArtistRequestsRoutes };
