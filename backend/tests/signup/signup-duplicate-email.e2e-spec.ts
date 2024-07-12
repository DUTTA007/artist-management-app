import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Signup Test Suite for Duplicate Email`, () => {
  beforeAll(async () => {
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
    await new Database().getConnection();
    await request(app).post("/user/signup").send(requestBody);
  });

  afterAll(async () => {
    // await new Database().dropDatabase();
  });

  it(`must not create a user with same email and return status 400`, async () => {
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
    const response = await request(app).post("/user/signup").send(requestBody);
    const { status } = response;
    expect(status).toBe(400);
  });
});
