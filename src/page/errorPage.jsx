import { Link, useNavigate } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="ep-root">

      {/* Animated grid background */}
      <div className="ep-grid" aria-hidden="true" />

      {/* Floating orbs */}
      <div className="ep-orb ep-orb-1" aria-hidden="true" />
      <div className="ep-orb ep-orb-2" aria-hidden="true" />
      <div className="ep-orb ep-orb-3" aria-hidden="true" />

      <div className="ep-content">

        {/* Glitch 404 */}
        <div className="ep-code-wrap" aria-hidden="true">
          <span className="ep-code" data-text="404">404</span>
        </div>

        {/* Status badge */}
        <div className="ep-badge">
          <span className="ep-badge-dot" />
          Page Not Found
        </div>

        {/* Heading */}
        <h1 className="ep-heading">
          Oops! You've drifted<br />
          <span className="ep-heading-accent">off the map</span>
        </h1>

        {/* Subtext */}
        <p className="ep-sub">
          The page you're looking for doesn't exist or has been moved.<br />
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="ep-actions">
          <Link to="/" className="ep-btn ep-btn-primary">
            <svg style={{background:'transparent'}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>

          <button onClick={() => navigate(-1)} className="ep-btn ep-btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Go Back
          </button>
        </div>

      </div>
    </div>
  )
}

export default ErrorPage