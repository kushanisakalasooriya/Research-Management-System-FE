const axios = require("axios");
import "regenerator-runtime/runtime";

describe("Sample test suit", () => {
  it("tests / API TEST/ GET specific student", async () => {
    await axios
      .get(`http://localhost:5000/admin/getFile/629b9f3f071d269118a83a55`)
      .then((res) => {
        expect(res.data).toEqual({
          "_id": "629b9f3f071d269118a83a55",
          "title": "Sample File 02",
          "description": "Sample file 02",
          "file_path": "AdminFiles\\1654366015663_Functional and Non-functional Testing.pdf",
          "file_mimetype": "application/pdf",
          "createdAt": "2022-06-04T18:06:55.747Z",
          "updatedAt": "2022-06-04T18:08:05.956Z",
          "__v": 0
      });
        expect(res.status).toBe(200);
      });
  });
});
