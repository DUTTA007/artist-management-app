import { Router } from "express";
import { ClientLeadsController } from "../controllers/client-leads-controller";
import { SchemaMiddleware } from "../middlewares/schema-middleware";
import { SchemaValidationErrorMiddleware } from "../middlewares/schema-validation-error-middleware";
import { ClientLeadIdSchema } from "../validations/client-leads-validations/client-lead-id-schema-validation";
import { CreateClientLeadSchema } from "../validations/client-leads-validations/create-client-lead-schema-validation";
import { RequirementSchema } from "../validations/client-leads-validations/requirements-schema-validation";
import { UpdateClientLeadByIdSchema } from "../validations/client-leads-validations/update-client-lead-by-id-schema-validation";
class ClientLeadsRoutes {
  static getClientLeadsRoutes(): Router {
    const router = Router();

    router.get("/", ClientLeadsController.getAllClientLeads);

    router.get(
      "/id/:_id",
      SchemaMiddleware.validate(ClientLeadIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ClientLeadsController.getClientLeadById
    );

    router.get(
      "/clientId/:client_id",
      ClientLeadsController.getClientLeadByClientId
    );

    router.get(
      "/pending",
      ClientLeadsController.getAllPendingRequests
    );

    router.get(
      "/approved",
      ClientLeadsController.getAllApprovedRequests
    );

    router.get(
      "/requirements/:requirements",
      SchemaMiddleware.validate(RequirementSchema),
      SchemaValidationErrorMiddleware.validate,
      ClientLeadsController.getClientLeadsByRequirements
    );

    router.post(
      "/",
      SchemaMiddleware.validate(CreateClientLeadSchema),
      SchemaValidationErrorMiddleware.validate,
      ClientLeadsController.createClientLead
    );

    router.put(
      "/id/:_id",
      SchemaMiddleware.validate(UpdateClientLeadByIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ClientLeadsController.updateClientLeadById
    );

    router.delete(
      "/id/:_id",
      SchemaMiddleware.validate(ClientLeadIdSchema),
      SchemaValidationErrorMiddleware.validate,
      ClientLeadsController.deleteClientLeadById
    );

    return router;
  }
}
export { ClientLeadsRoutes };
