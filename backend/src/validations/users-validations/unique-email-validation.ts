import { Database } from '../../database';

class UniqueEmailValidation {
  static async validateEmail(email: string): Promise<number> {
    try {
      const countParams = {
        query: { email },
        options: {},
        collection: 'users',
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      // if (count > 0) {
      //   throw new Error('Email exists');
      // }
      return count;
    } catch (e) {
      throw e;
    }
  }
}

export { UniqueEmailValidation };
