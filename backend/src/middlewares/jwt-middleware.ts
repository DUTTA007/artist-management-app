import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ObjectId } from "mongodb";
class JWTMiddleware {
  static createToken(userId: ObjectId, email: string): string {
    return jsonwebtoken.sign(
      {
        userId: userId,
        email: email,
      },
      process.env.SECRET_STRING,
      {
        expiresIn: "3h",
      }
    );
  }

  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    let jwt: string = (req.headers["x-access-token"] ||
      req.headers["authorization"]) as string;
    if (!jwt) {
      res.status(403).send({ message: "No token provided!" });
    } else {
      if(jwt.startsWith('Bearer ')) {
        jwt = jwt.slice(7);
      }
      jsonwebtoken.verify(jwt, process.env.SECRET_STRING, (err) => {
        if (err) {
          res.status(403).send(err);
        } else {
          next();
        }
      });
    }
  }
}

export { JWTMiddleware };