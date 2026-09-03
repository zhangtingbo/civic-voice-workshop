import { useState } from "react";
import { submitFeedback } from "../api";
import { FEEDBACK_MAX_LENGTH, limitFeedbackMessage } from "../lib/feedback";

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await submitFeedback({ nric: user.nric, name: user.name, message });
      setSubmitted(true);
      setMessage("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function startAnotherSubmission() {
    setSubmitted(false);
    setError("");
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted ? (
          <div className="success-panel">
            <div className="success-banner">Thank you. Your feedback has been received.</div>
            <p className="muted">You can share another issue, idea, or positive experience whenever you are ready.</p>
            <button className="primary-button" type="button" onClick={startAnotherSubmission}>Submit another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Your feedback
              <textarea
                rows="7"
                value={message}
                maxLength={FEEDBACK_MAX_LENGTH}
                onChange={(event) => setMessage(limitFeedbackMessage(event.target.value))}
                placeholder="Share your feedback here..."
              />
            </label>
            <div className="form-footer">
              <div>
                <div className="muted">Please do not include sensitive personal information.</div>
                <div className="character-count">{message.length} / {FEEDBACK_MAX_LENGTH} characters</div>
              </div>
              <button className="primary-button">Submit feedback</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
