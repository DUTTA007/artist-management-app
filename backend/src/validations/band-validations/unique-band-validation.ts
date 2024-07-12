import { Database } from '../../database';

class UniqueBandValidation {
  static async validateBand(idBandManager: string): Promise<void> {
    try {
      const countParams = {
        query: { idBandManager },
        options: {},
        collection: 'band',
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      if (count > 0) {
        throw new Error('Band already exists');
      }
    } catch (e) {
      throw e;
    }
  }
}

export { UniqueBandValidation };
