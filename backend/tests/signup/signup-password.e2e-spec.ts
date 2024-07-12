import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Signup Test Suite for Password`, () => {
  beforeAll(async () => {
    await new Database().getConnection();
  });

  afterAll(async () => {
    // await new Database().dropDatabase();
  });

  it(`must not take blank password and return status 400`, async () => {
    const requestBodyWrongPassword = {
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
      password: "",
      dateOfBirth: "1993-10-05",
      companyName: "",
      role: "freelancer",
      instrument: "Guitar",
      imageURL: "",
    };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWrongPassword);
    const { status } = response;
    expect(status).toBe(400);
  });

  it(`must not take weak password and return status 400`, async () => {
    const requestBodyWrongPassword = {
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
      password: "testuser",
      dateOfBirth: "1993-10-05",
      companyName: "",
      role: "freelancer",
      instrument: "Guitar",
      imageURL: "",
    };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWrongPassword);
    const { status } = response;
    expect(status).toBe(400);
  });
});
