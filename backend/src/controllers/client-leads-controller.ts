//all the apis related to the requests from clients

import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Database, InsertParams, ReadParams } from "../database";
import Logging from "../library/logging";

class ClientLeadsController {
  //fetch all the requests from client
  static async getAllClientLeads(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: {},
        options: {},
        collection: "clientLeads",
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

  //fetch a request from client by request id
  static async getClientLeadById(req: Request, res: Response) {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const readParams: ReadParams = {
        query: { _id: id },
        options: {},
        collection: "clientLeads",
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
  //fetch a request from client by client id
  static async getClientLeadByClientId(req: Request, res: Response) {
    let response = "";
    let status = 0;
    const { client_id } = req.params;

    try {
      const readParams: ReadParams = {
        query: { client_id },
        options: {},
        collection: "clientLeads",
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

  static async getAllPendingRequests(req: Request, res: Response) {
    let response = "";
    let status = 0;
    try {
      const readParams: ReadParams = {
        query: { is_pending: true },
        options: {},
        collection: "clientLeads",
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
        collection: "clientLeads",
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

  //post a request from client
  static async createClientLead(req: Request, res: Response) {
    let response = "";
    let status = 0;
    let clientLead = req.body;
    try {
      const insertOneParams: InsertParams = {
        data: clientLead,
        collection: "clientLeads",
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

  static async updateClientLeadById(
    req: Request,
    res: Response
  ): Promise<void> {
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
        collection: "clientLeads",
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

  static async deleteClientLeadById(
    req: Request,
    res: Response
  ): Promise<void> {
    let response = "";
    let status = 0;
    const { _id } = req.params;
    let id = new ObjectId(_id);
    try {
      const deleteOneParams = {
        filter: { _id: id },
        options: {},
        collection: "clientLeads",
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

  //fetch requests by client based on requirement
  static async getClientLeadsByRequirements(req: Request, res: Response) {
    let response = "";
    let status = 0;
    const { requirements } = req.params;
    try {
      const readParams: ReadParams = {
        query: { requirements },
        options: { projection: { type: 1, location: 1, requirements: 1 } },
        collection: "clientLeads",
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
}
export { ClientLeadsController };
