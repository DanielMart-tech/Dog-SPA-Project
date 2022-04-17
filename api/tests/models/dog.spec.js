const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });
    });
    describe("height", () => {
      it("should throw an error is height is not a number", (done) => {
        Dog.create({ height: "4" })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when it is a number", () => {
        Dog.create({ height: 4 });
      });
    });
    describe("weight", () => {
      it("should throw an error if weight is not a number", (done) => {
        Dog.create({ weight: "4" })
          .then(() => done(new Error("It requires a string")))
          .catch(() => done());
      });
      it("should work when it is a number", () => {
        Dog.create({ weight: 4 });
      });
    });
    describe("life_span", () => {
      it("should throw an error if life_span is not a string", (done) => {
        Dog.create({ life_span: 4 })
          .then(() => done(new Error("It requires a string")))
          .catch(() => done());
      });
      it("should work when it is a string", () => {
        Dog.create({ life_span: "4" });
      });
    });
  });
});
