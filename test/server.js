// The following tutorial was followed to develop this test: https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

// to run the test: run 'npm test' in the parent directory of this file. The command  "mocha --reporter spec" has been inserted in the package.json file

// requires the chai library
const expect = require("chai").expect;
// requires the request package
const request = require("request");

describe('Testing 4 API endpoints', function () {

    // mocha porvides us with a descfribe function where we can describe what we are doing, combined with a function that contains our expectations
    // the it function will contain the expectaion
    // the expect function is from the chai library, and it is used to state what we are expecting, whether it is a certain data type or value
    // the request library gives us easy acces to the response object and all its information, such as status code etc.

    // route 1
    describe("Get a random number between 1 - 1023", function () {
        const url = "http://localhost:3000/random";

        // checks status code
        it("returns status 200", function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });

        // checks data type
        it("returns a JSON-object", function () {
            request(url, function (error, response, body) {
                expect(JSON.parse(body)).to.be.an('object');
            });
        });

        // checks the value
        it("returns number between 0 and 1023", function () {
            request(url, function (error, response, body) {
                expect(JSON.parse(body).number).to.be.above(0);
                expect(JSON.parse(body).number).to.not.be.above(1023);
            });
        });
    });

    // route 2
    describe("Get a random number between 1 - num", function () {
        // 20000 is used as an example here
        const url = "http://localhost:3000/custom_random/20000";

        it("returns status 200", function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });

        it("returns a JSON-object", function () {
            request(url, function (error, response, body) {
                expect(JSON.parse(body)).to.be.an('object');
            });
        });

        it("returns number between 0 and num", function () {
            request(url, function (error, response, body) {
                // to retrieve the number entered in the url, since it is the user who enters it. Slices it from the last "/" sign and makes it into a number
                let num = parseInt(response.request.path.slice(response.request.path.lastIndexOf('/') + 1));
                expect(JSON.parse(body).number).to.be.above(0);
                expect(JSON.parse(body).number).to.not.be.above(num);
            });
        });
    });

    // route 3
    describe("Show value of internal node state", function () {
        const url = "http://localhost:3000/show_value";

        it("returns status 200", function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });

        it("returns a string", function () {
            request(url, function (error, response, body) {
                expect(body).to.be.a('string');
            });
        });
    });

    // route 4
    describe("Increase internal state by 1", function () {
        const url = "http://localhost:3000/increase_value";

        it("returns status 200", function () {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });

        it("returns a string", function () {
            request(url, function (error, response, body) {
                expect(body).to.be.a('string');
            });
        });
    });

})