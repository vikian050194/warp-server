const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/app");

const should = chai.should();
chai.use(chaiHttp);

describe("app", function () {
    beforeEach(app.init);

    it("GET data - Not Found", (done) => {
        chai.request(app)
            .get("/test")
            .end((err, res) => {
                should.exist(res.status);
                res.should.have.status(404);
                done();
            });
    });

    it("POST data - OK", (done) => {
        const data = {
            "number": 1234
        };

        chai.request(app)
            .post("/test")
            .set("Authorization", "te$t")
            .send(data)
            .end((err, res) => {
                should.exist(res.status);
                res.should.have.status(200);
                done();
            });
    });

    it("PUT data - Not Found", (done) => {
        const data = {
            "number": 1234
        };

        chai.request(app)
            .put("/test")
            .set("Authorization", "te$t")
            .send(data)
            .end((err, res) => {
                should.exist(res.status);
                res.should.have.status(401);
                done();
            });
    });
});