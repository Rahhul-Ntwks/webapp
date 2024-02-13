const request = require("supertest");
const server = require("../index");
const generateBasicAuthHeader = require("../utils/Hashgenerator");
const {testConnection,sequelize} = require('../config/dbconfig');
const User = require('../models/user');

describe("User Endpoint Integration Tests", () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const user = {
    first_name: "rahhul",
    last_name: "ganeesh",
    password: "rahhul",
    username: `rahhulganeesh@gmail.com`,
  };
  const putUser = {
    first_name: "rahhul",
    last_name: "reddi",
    password: "ganeesh",
  };
  const hash = generateBasicAuthHeader(user.username, user.password);
  const updateHash = generateBasicAuthHeader(user.username, putUser.password);
  let tableId;
  beforeAll(async () => {
    await testConnection()
    await User.sync()
  });

  it("POST user", async () => {
    debugger;
    const response = await request(server).post("/v1/user").send(user);
    tableId = response.body.id;
    console.log(response)
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      })
    );
  });

  it("GET user detail in POST", async () => {
    debugger;
    const response = await request(server)
      .get(`/v1/user/self`)
      .set("Authorization", hash);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      })
    );
  });

  it("PUT user", async () => {
    debugger;
    const response = await request(server)
      .put("/v1/user/self")
      .set("Authorization", hash)
      .send(putUser);
    tableId = response.body.id;
    expect(response.statusCode).toEqual(204);
  });

  it("GET user after PUT", async () => {
    debugger;
    const response = await request(server)
      .get(`/v1/user/self`)
      .set("Authorization", updateHash);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        first_name: putUser.first_name,
        last_name: putUser.last_name,
      })
    );
  });

  afterAll((done) => {
    server.close(done);
  });
});
