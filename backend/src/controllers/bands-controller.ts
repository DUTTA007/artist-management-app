import { Request, Response } from "express";
import { Database, InsertParams, ReadParams } from "../database";
import Logging from "../library/logging";
import { ObjectId } from "mongodb";

class BandsController {
  static async getBands(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: {},
        options: {},
        collection: "band",
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

  static async getBandById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const readParams: ReadParams = {
        query: { _id: id },
        options: {},
        collection: "band",
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

  static async createBand(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const data = req.body;
      const insertOneParams: InsertParams = {
        data,
        collection: "band",
      };
      const db = new Database();
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

  static async updateBandById(req: Request, res: Response): Promise<void> {
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
        collection: "band",
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

  static async deleteBandById(req: Request, res: Response): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const deleteOneParams = {
        filter: { _id: id },
        options: {},
        collection: "band",
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
export { BandsController };
