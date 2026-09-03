import { describe, expect, it } from "vitest";
import { isValidWorkshopNric } from "./nric";

describe("isValidWorkshopNric", () => {
  it("accepts the fictional seeded workshop IDs", () => {
    expect(isValidWorkshopNric("S0000001A")).toBe(true);
    expect(isValidWorkshopNric("S0000002B")).toBe(true);
  });

  it("rejects empty and malformed values", () => {
    expect(isValidWorkshopNric("")).toBe(false);
    expect(isValidWorkshopNric("S000001A")).toBe(false);
    expect(isValidWorkshopNric("not-an-id")).toBe(false);
  });
});
