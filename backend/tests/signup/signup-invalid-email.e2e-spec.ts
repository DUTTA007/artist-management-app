import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe(`Signup Test Suite for invalid email format`, () => {
  beforeAll(async () => {
    await new Database().getConnection();
  });

  afterAll(async () => {
    // await new Database().dropDatabase();
  });

  it(`must not create a user when email blank and return status 400`, async () => {
    const requestBodyWithWrongEmail = {
        address: {
          city: "Mannheim",
          country: "Germany",
          streetName: "Langstrasse",
          streetNumber: "44",
          pinCode: "68169",
        },
        firstName: "Test",
        lastName: "User",
        email: "",
        contactNumber: "+6147893443",
        password: "Testuser@123",
        dateOfBirth: "1993-10-05",
        companyName: "",
        role: "freelancer",
        instrument: "Guitar",
        imageURL: "",
      };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWithWrongEmail);
    const { status } = response;
    expect(status).toBe(400);
  });

  it(`must not create a user when email invalid and return status 400`, async () => {
    const requestBodyWithWrongEmail = {
        address: {
          city: "Mannheim",
          country: "Germany",
          streetName: "Langstrasse",
          streetNumber: "44",
          pinCode: "68169",
        },
        firstName: "Test",
        lastName: "User",
        email: "testusergmail.com",
        contactNumber: "+6147893443",
        password: "Testuser@123",
        dateOfBirth: "1993-10-05",
        companyName: "",
        role: "freelancer",
        instrument: "Guitar",
        imageURL: "",
      };
    const response = await request(app)
      .post("/user/signup")
      .send(requestBodyWithWrongEmail);
    const { status } = response;
    expect(status).toBe(400);
  });
});
