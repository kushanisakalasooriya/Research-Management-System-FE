const axios = require("axios");
import "regenerator-runtime/runtime";

describe("Sample test suit", () => {
  it("tests / API TEST/ GET specific student", async () => {
    await axios
      .get(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/getFile/629b768e67f6181abbf1bbab`)
      .then((res) => {
        expect(res.data).toEqual({
          _id: "629b768e67f6181abbf1bbab",
          title: "Sample File",
          description: "Sample File",
          file_path: "AdminFiles\\1654355598284_Code Coverage Lab.pdf",
          file_mimetype: "application/pdf",
          createdAt: "2022-06-04T15:13:18.295Z",
          updatedAt: "2022-06-04T15:13:18.295Z",
          __v: 0,
        });
        expect(res.status).toBe(200);
      });
  });
});
