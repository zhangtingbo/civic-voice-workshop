import { describe, expect, it } from "vitest";
import { FEEDBACK_MAX_LENGTH, limitFeedbackMessage } from "./feedback";

describe("feedback character limit", () => {
  it("keeps messages at or below 500 characters", () => {
    expect(limitFeedbackMessage("a".repeat(FEEDBACK_MAX_LENGTH))).toHaveLength(FEEDBACK_MAX_LENGTH);
    expect(limitFeedbackMessage("a".repeat(FEEDBACK_MAX_LENGTH + 1))).toHaveLength(FEEDBACK_MAX_LENGTH);
  });
});
