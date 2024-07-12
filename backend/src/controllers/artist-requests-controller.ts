import { InsertParams, Database, ReadParams } from "../database";
import Logging from "../library/logging";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

class ArtistRequestsController {
  //fetch all the requests made by band manager
  static async getAllArtistRequests(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: {},
        options: {},
        collection: "artistRequests",
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

  //fetch a request from band manager by request id
  static async getArtistRequestById(req: Request, res: Response) {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const readParams: ReadParams = {
        query: { _id: id },
        options: {},
        collection: "artistRequests",
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

  //fetch a request made by band manager by the freelancer assigned to it
  static async getArtistRequestByFreelancerId(req: Request, res: Response) {
    let response = "";
    let status = 0;
    let { freelancer_id } = req.params;
    try {
      const readParams: ReadParams = {
        query: { freelancer_id },
        options: {},
        collection: "artistRequests",
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

  static async getAllPendingRequests(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: { is_pending: true },
        options: {},
        collection: "artistRequests",
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

  static async getAllApprovedRequests(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: { is_approved: true },
        options: {},
        collection: "artistRequests",
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

  //create a request made by band manager for an artist
  static async createArtistRequest(req: Request, res: Response) {
    let response = "";
    let status = 0;
    let artistRequest = req.body;
    try {
      const insertOneParams: InsertParams = {
        data: artistRequest,
        collection: "artistRequests",
      };
      const db: Database = new Database();
      response = await db.insertOne(insertOneParams);
      status = 201;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      response = e.message;
      status = 500;
    } finally {
      res.status(status).send(response);
    }
  }

  static async updateArtistRequestById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const data = req.body;
      const updateOneParams = {
        filter: { _id: id },
        update: { $set: { ...data } },
        options: {},
        collection: "artistRequests",
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

  static async deleteArtistRequestById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const deleteOneParams = {
        filter: { _id: id },
        options: {},
        collection: "artistRequests",
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
}

export { ArtistRequestsController };
