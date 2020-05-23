import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("register", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("returns OK", async () => {
      const { ok } = await specHelper.runAction("register");
      expect(ok).toEqual(true);
    });
  });
});
