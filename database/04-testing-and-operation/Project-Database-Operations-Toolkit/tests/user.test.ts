import { userFactory } from "./helpers/factory.js";

test("user factory", () => {
  const user = userFactory();

  expect(user.email).toContain("@");
});
