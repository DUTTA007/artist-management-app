import { Router } from "express";
import { UsersController } from "../controllers/users-controller";
import { SchemaMiddleware } from "../middlewares/schema-middleware";
import { SchemaValidationErrorMiddleware } from "../middlewares/schema-validation-error-middleware";
import { IdSchema } from "../validations/users-validations/id-schema-validation";
import { LoginSchema } from "../validations/users-validations/login-schema-validations";
import { RoleSchema } from "../validations/users-validations/role-schema-validation";
import { SignUpSchema } from "../validations/users-validations/signup-schema-validations";
import { UpdateUserByIdSchema } from "../validations/users-validations/update-user-by-id-schema-validation";
import { UserFilterSchema } from "../validations/users-validations/user-filter-schema-validation";

class UsersRoutes {
  static getUsersRoutes(): Router {
    const router = Router();

    router.post(
      "/signup",
      SchemaMiddleware.validate(SignUpSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.signup
    );

    router.post(
      "/login",
      SchemaMiddleware.validate(LoginSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.login
    );

    router.get("/", UsersController.getUsers);

    router.get(
      "/id/:_id",
      SchemaMiddleware.validate(IdSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.getUserById
    );

    router.get(
      "/role/:role",
      SchemaMiddleware.validate(RoleSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.getUserByRole
    );

    router.get(
      "/pageNo/:pageNo/pageSize/:pageSize",
      UsersController.getPaginatedUsers
    );

    router.put(
      "/id/:_id",
      SchemaMiddleware.validate(UpdateUserByIdSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.updateUserById
    );

    router.delete(
      "/id/:_id",
      SchemaMiddleware.validate(IdSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.deleteUserById
    );

    router.get(
      "/filterParam/:filterParam/value/:value",
      SchemaMiddleware.validate(UserFilterSchema),
      SchemaValidationErrorMiddleware.validate,
      UsersController.filterByParameter
    );

    return router;
  }
}

export { UsersRoutes };
