const assert = require("assert");
const config = require("../../config/keys");

describe("Test Config File", () => {
  it("should return an object of the configurations", async () => {
    assert.equal("object", typeof config);
  });
});
