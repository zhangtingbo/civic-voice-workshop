import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "../api";
import { FEEDBACK_MAX_LENGTH, limitFeedbackMessage } from "../lib/feedback";

export function CitizenPage({ user }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const successPanelRef = useRef(null);

  useEffect(() => {
    if (submitted) successPanelRef.current?.focus();
  }, [submitted]);

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
          <div className="success-panel" role="status" aria-live="polite" tabIndex="-1" ref={successPanelRef}>
            <div className="success-banner">Thank you. Your feedback has been received.</div>
            <p className="muted">You can share another issue, idea, or positive experience whenever you are ready.</p>
            <button className="primary-button" type="button" onClick={startAnotherSubmission}>Submit another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-message">Your feedback</label>
            <textarea
              id="feedback-message"
              rows="7"
              value={message}
              maxLength={FEEDBACK_MAX_LENGTH}
              onChange={(event) => setMessage(limitFeedbackMessage(event.target.value))}
              placeholder="Share your feedback here..."
              required
              aria-required="true"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "feedback-error feedback-privacy-note feedback-character-count" : "feedback-privacy-note feedback-character-count"}
            />
            <div className="form-footer">
              <div>
                <div className="muted" id="feedback-privacy-note">Please do not include sensitive personal information.</div>
                <div className="character-count" id="feedback-character-count">{message.length} / {FEEDBACK_MAX_LENGTH} characters</div>
              </div>
              <button className="primary-button">Submit feedback</button>
            </div>
            {error && <p className="error-message" id="feedback-error" role="alert" aria-live="assertive">{error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
