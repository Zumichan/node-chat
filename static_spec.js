const request = require("request");
const app = require("./app");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", ()=>{
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      })
    })
  })
})