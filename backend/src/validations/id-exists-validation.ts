import { ObjectId } from 'mongodb';
import { CountParams, Database } from '../database';

class IdExistsValidation {
  static async validate(id: string, collection: string): Promise<number> {
    try {
      const _id = ObjectId.createFromHexString(id);
      const countParams: CountParams = {
        query: { _id },
        options: {},
        collection: collection,
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      return count;
    } catch (e) {
      throw e;
    }
  }
}

export { IdExistsValidation };
