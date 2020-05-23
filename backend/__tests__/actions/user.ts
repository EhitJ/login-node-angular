import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("user", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("returns OK", async () => {
      const { ok } = await specHelper.runAction("user");
      expect(ok).toEqual(true);
    });
  });
});
