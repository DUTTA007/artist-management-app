import request from "supertest";
import { Database } from "../../src/database";
import { app } from "../../src/app";

describe("signUp e2e test suite", () => {
  beforeEach(async () => {
    await new Database().getConnection();
  });

  afterEach(async () => {
    // await new Database().dropDatabase();
  });

  it(`must be alive`, async () => {
    const response = await request(app).get(`/isAlive`).send();
    const { status } = response;
    expect(status).toBe(200);
  });

  it(`must create a user and return 201`, async () => {
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
    expect(status).toBe(201);
  });

  it(`must create a user and return the original user`, async () => {
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
    const objectFromDB = response.body.ops[0];
    delete objectFromDB._id;
    expect(objectFromDB).toEqual(requestBody);
  });
});
