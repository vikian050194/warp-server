const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../src/app");

const should = chai.should();
chai.use(chaiHttp);

describe("app", function () {
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
});