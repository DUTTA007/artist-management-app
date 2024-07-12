import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Login Test Suite for Invalid Credentials`, () => {
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

  it(`must not login when credentials are invalid and return status 401`, async () => {
    const requestBody = {
      email: "testuser@gmail.com",
      password: "Testuser@1234",
    };
    const response = await request(app).post("/user/login").send(requestBody);
    const { status } = response;
    expect(status).toBe(401);
  });

  it(`must login when dots are added to username and return status 202`, async () => {
    const requestBody = {
      email: "test.user@gmail.com",
      password: "Testuser@123",
    };
    const response = await request(app).post("/user/login").send(requestBody);
    const { status } = response;
    expect(status).toBe(202);
  });
});
