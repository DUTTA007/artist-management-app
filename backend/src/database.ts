import { MongoClient } from "mongodb";
import Logging from "./library/logging";

class Database {
  async getConnection(): Promise<MongoClient> {
    try {
      const client = new MongoClient(process.env.DB_URL);
      const connection = await client.connect();
      return connection;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    }
  }

  async dropDatabase(): Promise<void> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      await db.dropDatabase();
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async insertOne(insertOneParams: InsertParams): Promise<any> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(insertOneParams.collection);
      const data = await collection.insertOne(insertOneParams.data);
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async countDocuments(countParams: CountParams): Promise<number> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(countParams.collection);
      const data: number = await collection.countDocuments(
        countParams.query,
        countParams.options
      );
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async read(readParams: ReadParams): Promise<string> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(readParams.collection);
      const data = await collection
        .find(readParams.query, readParams.options)
        .toArray();
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async pagination(paginationParams: PaginationParams): Promise<string> {
    let client;
    let { pageNo, pageSize } = paginationParams;
    if (pageNo !== 0) {
      pageNo *= pageSize;
    }
    console.log("pageNo in db.ts", pageNo);
    console.log("pageSize in db.ts", pageSize);
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(paginationParams.collection);
      const data = await collection
        .find(paginationParams.query, paginationParams.options)
        .skip(pageNo)
        .limit(pageSize)
        .toArray();
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async readOne(readOneParams: ReadParams): Promise<any> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(readOneParams.collection);
      const data = await collection.findOne(
        readOneParams.query,
        readOneParams.options
      );
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async updateOne(updateOneParams: UpdateParams): Promise<any> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(updateOneParams.collection);
      const data = await collection.updateOne(
        updateOneParams.filter,
        updateOneParams.update,
        updateOneParams.options
      );
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }

  async deleteOne(deleteOneParams: DeleteParams): Promise<any> {
    let client;
    try {
      client = await this.getConnection();
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(deleteOneParams.collection);
      const data = await collection.deleteOne(
        deleteOneParams.filter,
        deleteOneParams.options
      );
      return data;
    } catch (e) {
      Logging.error(`${e.message}-${e.stack}`);
      throw e;
    } finally {
      client.close();
    }
  }
}

export type InsertParams = {
  collection: string;
  data: any;
};

export type CountParams = {
  query: object;
  options: object;
  collection: string;
};

export type ReadParams = {
  query: object;
  options: object;
  collection: string;
};

export type PaginationParams = {
  query: object;
  options: object;
  collection: string;
  pageNo: number;
  pageSize: number;
};

export type UpdateParams = {
  filter: object;
  update: object;
  options: object;
  collection: string;
};

export type DeleteParams = {
  filter: object;
  options: object;
  collection: string;
};

export { Database };
