import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Signup Test Suite for date of birth`, () => {
  beforeAll(async () => {
    await new Database().getConnection();
  });

  afterAll(async () => {
    // await new Database().dropDatabase();
  });

  it(`must not take blank dob and return status 400`, async () => {
    const requestBodyWrongDOB = {
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
      dateOfBirth: "",
      companyName: "",
      role: "freelancer",
      instrument: "Guitar",
      imageURL: "",
    };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWrongDOB);
    const { status } = response;
    expect(status).toBe(400);
  });

  it(`must not take the dob and return status 400`, async () => {
    const requestBodyWrongDOB = {
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
      dateOfBirth: "2018-05-23",
      companyName: "",
      role: "freelancer",
      instrument: "Guitar",
      imageURL: "",
    };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWrongDOB);
    const { status } = response;
    expect(status).toBe(400);
  });
});
