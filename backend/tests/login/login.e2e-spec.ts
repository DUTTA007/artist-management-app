import request from "supertest";
import validator from "validator";
import { Database } from "../../src/database";
import { app } from "../../src/app";
import { ObjectId } from "mongodb";

describe(`Login Test Suite`, () => {
  beforeAll(async () => {
    await new Database().getConnection();
    const requestBody = {
      address: {
        city: "Mannheim",
        country: "Germany",
        streetName: "Langstrasse",
        streetNumber: "44",
        pinCode: "68169",
      },
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      contactNumber: "+6147893443",
      password: "Testuser@123",
      dateOfBirth: "1993-10-05",
      companyName: "",
      role: "freelancer",
      instrument: "Guitar",
      imageURL: "",
    };
    await request(app).post("/user/signup").send(requestBody);
  });

  afterAll(async () => {
    // await new Database().dropDatabase();
  });

  it(`must login and return status 202`, async () => {
    const requestBody = {
      username: "testuser@gmail.com",
      password: "Testuser@123",
    };
    const response = await request(app).post("/user/login").send(requestBody);
    const { status } = response;
    expect(status).toBe(202);
  });

  it(`must login and return JWT`, async () => {
    const requestBody = {
      username: "testuser@gmail.com",
      password: "Testuser@123",
    };
    const response = await request(app).post("/user/login").send(requestBody);
    const { body } = response;
    const { data } = body;
    const { token } = data;
    expect(validator.isJWT(token)).toBeTruthy();
  });

  it(`must login and return userID in mongoDB ObjectID format`, async () => {
    const requestBody = {
      username: "testuser@gmail.com",
      password: "Testuser@123",
    };
    const response = await request(app).post("/user/login").send(requestBody);
    const { body } = response;
    const { data } = body;
    const { userId } = data;
    expect(ObjectId.isValid(userId)).toBeTruthy();
  });
});
