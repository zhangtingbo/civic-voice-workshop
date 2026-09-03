import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "../api";

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

  return (
    <main className="page-shell">
      <div className="page-heading">
        <div className="eyebrow">Public feedback</div>
        <h1>What would you like us to know?</h1>
        <p>Tell us about an issue, an idea, or a positive experience in your community.</p>
      </div>
      <section className="form-card">
        {submitted && (
          <div className="success-banner" role="status" aria-live="polite" tabIndex="-1" ref={successPanelRef}>
            Thank you. Your feedback has been received.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="feedback-message">Your feedback</label>
          <textarea
            id="feedback-message"
            rows="7"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share your feedback here..."
            required
            aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "feedback-error feedback-privacy-note" : "feedback-privacy-note"}
          />
          <div className="form-footer">
            <span className="muted" id="feedback-privacy-note">Please do not include sensitive personal information.</span>
            <button className="primary-button">Submit feedback</button>
          </div>
          {error && <p className="error-message" id="feedback-error" role="alert" aria-live="assertive">{error}</p>}
        </form>
      </section>
    </main>
  );
}
