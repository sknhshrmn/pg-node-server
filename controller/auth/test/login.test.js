import request from "supertest";
import app from "../../../app";

describe("Try login with empty fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/login")
      .send({
        identifier: "",
        password: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try login using username", () => {
  test("It should return status code 200 and return message and user data", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "admin2",
        password: "abcd1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login successful");
      });
  });
});

describe("Try login using email", () => {
  test("It should return status code 200 and return message and user data", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "admin2@mail.com",
        password: "abcd1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login successful");
      });
  });
});

describe("Try login using correct email false password", () => {
  test("It should return status code 401 and return message and user data", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "admin2@mail.com",
        password: "abcda1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        // expect(response.body).toEqual(
        //   expect.objectContaining({
        //     message: "Login unsuccessful",
        //     data: "Invalid credential",
        //   })
        // );
        expect(response.body.message).toEqual("Login unsuccessful");
        expect(response.body.data).toEqual("Invalid credential");
      });
  });
});
