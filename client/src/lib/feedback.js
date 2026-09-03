export const FEEDBACK_MAX_LENGTH = 500;

export function limitFeedbackMessage(value) {
  return value.slice(0, FEEDBACK_MAX_LENGTH);
}
