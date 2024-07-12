import { NextFunction, Request, Response } from "express";
import {
  Database,
  InsertParams,
  PaginationParams,
  ReadParams,
} from "../database";
import Logging from "../library/logging";
import { UserAuthentication } from "../authentication/user-authentication";
import { JWTMiddleware } from "../middlewares/jwt-middleware";
import { ObjectId } from "mongodb";
import { PasswordHashingService } from "../services/password-hashing-service";

class UsersController {
  static async signup(req: Request, res: Response): Promise<void> {
    let response = {
      data: "",
      _links: [],
    };
    let status = 0;
    let user = req.body;
    let { password } = user;
    user.password = await PasswordHashingService.hashPassword(password);
    try {
      const insertOneParams: InsertParams = {
        data: user,
        collection: "users",
      };
      const db: Database = new Database();
      response.data = await db.insertOne(insertOneParams);
      response._links = [
        {
          rel: "self",
          href: "http://localhost:3001/user/signup",
        },
        {
          rel: "login",
          href: "http://localhost:3001/user/login",
        },
      ];
      status = 201;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let response = {
      data: {},
      _links: [],
    };
    let status = 0;
    try {
      const { email, password } = req.body;
      const userAuthResponse = await UserAuthentication.authenticateUser(
        email,
        password
      );
      if (userAuthResponse.code !== 401) {
        response.data = {
          userId: userAuthResponse._id,
          email: userAuthResponse.email,
          token: JWTMiddleware.createToken(
            userAuthResponse._id,
            userAuthResponse.email
          ),
        };
        status = 202;
      } else {
        response.data = userAuthResponse.message;
        status = userAuthResponse.code;
      }
      response._links = [
        {
          rel: "self",
          href: "http://localhost:3001/user/login",
        },
        {
          rel: "users",
          href: "http://localhost:3001/api/user",
        },
      ];
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async getUsers(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: {},
        options: {},
        collection: "users",
      };
      const db = new Database();
      response = await db.read(readParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const readParams: ReadParams = {
        query: { _id: id },
        options: {},
        collection: "users",
      };
      const db = new Database();
      response = await db.read(readParams);
      console.log("response", response);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async getUserByRole(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { role } = req.params;
    try {
      const readParams: ReadParams = {
        query: { role },
        options: {},
        collection: "users",
      };
      const db = new Database();
      response = await db.read(readParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async updateUserById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    let user = req.body;
    let { password } = user;
    if (password) {
      user.password = await PasswordHashingService.hashPassword(password);
    }
    try {
      const updateOneParams = {
        filter: { _id: id },
        update: { $set: { ...user } },
        options: {},
        collection: "users",
      };
      const db = new Database();
      response = await db.updateOne(updateOneParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async getPaginatedUsers(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { pageNo, pageSize } = req.params;
    let pageNoInt = parseInt(pageNo);
    let pageSizeInt = parseInt(pageSize);
    try {
      const paginationParams: PaginationParams = {
        query: {},
        options: {},
        collection: "users",
        pageNo: pageNoInt,
        pageSize: pageSizeInt,
      };
      const db = new Database();
      response = await db.pagination(paginationParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async deleteUserById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const deleteOneParams = {
        filter: { _id: id },
        options: {},
        collection: "users",
      };
      const db = new Database();
      response = await db.deleteOne(deleteOneParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async filterByParameter(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { filterParam, value } = req.params;
    try {
      const readParams: ReadParams = {
        query: {},
        options: {},
        collection: "users",
      };
      readParams.query[filterParam] = value;
      const db = new Database();
      response = await db.read(readParams);
      status = 200;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }
}

export { UsersController };
