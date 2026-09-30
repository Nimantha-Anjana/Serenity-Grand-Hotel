import { Link } from 'react-router-dom';
import '../css/Forms.css';

/**
 * Shared wrapper for every admin form page:
 * page title + "Back" button on top, the form inside a card below.
 */
export default function FormPageLayout({
  title,
  subtitle,
  icon = 'bi-pencil-square',
  backTo,
  backLabel = 'Back to list',
  maxWidth = 900,
  children,
}) {
  return (
    <div className="form-page">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title mb-1">
            <i className={`bi ${icon} me-2 text-gold-accent`}></i>
            {title}
          </h2>
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </div>
        <Link to={backTo} className="btn btn-outline-secondary mt-3 mt-md-0">
          <i className="bi bi-arrow-left me-2"></i>
          {backLabel}
        </Link>
      </div>

      <div className="luxury-card form-page-card p-4" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}

/** Shown when /edit/:id points to something that does not exist. */
export function RecordNotFound({ label, backTo }) {
  return (
    <FormPageLayout
      title={`${label} not found`}
      subtitle="This record may have been deleted."
      icon="bi-exclamation-triangle"
      backTo={backTo}
      maxWidth={600}
    >
      <p className="mb-0 text-muted">
        We could not find the {label.toLowerCase()} you are trying to edit. Go back to the list and pick another one.
      </p>
    </FormPageLayout>
  );
}
