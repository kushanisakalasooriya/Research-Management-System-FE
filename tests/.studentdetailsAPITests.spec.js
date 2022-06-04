const axios = require("axios");
import "regenerator-runtime/runtime";

describe("Sample login test suit", () => {
  it("tests / API TEST/ GET student by ID", async () => {
    await axios
      .get(`http://localhost:5000/student/registration/629a483c095b75119dd8940d`)
      .then((res) => {
        expect(res.data).toEqual({
          _id: "629a483c095b75119dd8940d",
          stdID: "IT10203040",
          firstName: "Kasuni",
          lastName: "Silva",
          email: "kasuni@gmail.com",
          password:"$2b$10$Xt4omcF9bIXh5bmVswIeQOVMqhf900gTj3N.uTtoz7fRiJVPAVqdC",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BzGCRFUnQvDPPd8rrI9cHczEpj4ED5avR1pnKjAxkZ3yq_yoCrdXalvDvjLLEaaEMH0&usqp=CAU",
          __v: 0,
        });
        expect(res.status).toBe(200);
      });
  });
});