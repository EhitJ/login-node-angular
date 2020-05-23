import { Process, specHelper } from "actionhero";
const actionhero = new Process();
let api;

describe("Action", () => {
  describe("token", () => {
    beforeAll(async () => {
      api = await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("returns OK", async () => {
      const { ok } = await specHelper.runAction("token");
      expect(ok).toEqual(true);
    });
  });
});
