import { Database, ReadParams } from "../database";
import bcrypt from "bcryptjs";
import { HttpError } from "../models/http-error";

class UserAuthentication {
  static async authenticateUser(email: string, password: string): Promise<any> {
    try {
      let isValidPassword = false;
      const db = new Database();
      const readOneUserParams: ReadParams = {
        query: { email },
        options: {},
        collection: "users",
      };
      const user = await db.readOne(readOneUserParams);
      isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        return user;
      } else {
        const error = new HttpError(
          "Invalid credentials, could not log you in!",
          401
        );
        return error;
      }
    } catch (e) {
      throw e;
    }
  }
}

export { UserAuthentication };
