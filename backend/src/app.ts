import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { UsersRoutes } from "./routes/users-routes";
import { BandsRoutes } from "./routes/bands-route"; ///GB
import { ClientLeadsRoutes } from "./routes/client-leads-routes"; ///GB
import { ArtistRequestsRoutes } from "./routes/artist-requests-routes"; ///GB
import { HttpError } from "./models/http-error";
import { Database } from "./database";
import Logging from "./library/logging";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { JWTMiddleware } from "./middlewares/jwt-middleware";

dotenv.config();

const db = new Database();
db.getConnection()
  .then(() => {
    Logging.info("Mongo connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect");
    console.error(error);
  });

const app: Application = express();
const PORT: number = 3001;

app.use(express.json({limit: '50mb'}));

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "x-token-header",
    "x-access-token",
  ],
  credentials: true,
  methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));

var cssoptions = {
  customCssUrl: "./swagger.css",
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, cssoptions)
);
app.use(bodyParser.json());

app.all("/api/*", JWTMiddleware.verifyToken);
app.use("/user", UsersRoutes.getUsersRoutes());
app.use("/band", BandsRoutes.getBandsRoutes());
app.use("/api/user", UsersRoutes.getUsersRoutes());
app.use("/api/band", BandsRoutes.getBandsRoutes()); ///GB
app.use("/api/clientLeads", ClientLeadsRoutes.getClientLeadsRoutes()); ///GB
app.use("/api/artistRequests", ArtistRequestsRoutes.getArtistRequestsRoutes()); ///GB

// app.use("/clientLeads", ClientLeadsRoutes.getClientLeadsRoutes());
// app.use("/artistRequests", ArtistRequestsRoutes.getArtistRequestsRoutes());

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(PORT, (): void => {
  Logging.info(`Listening on port: ${PORT}`);
});

export { app };