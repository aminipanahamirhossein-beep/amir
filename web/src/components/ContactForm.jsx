import { useId, useState } from 'react';
import ArrowIcon from './ArrowIcon.jsx';

const PROJECT_TYPES = [
  'Architecture',
  'Interior design',
  'Urban planning',
  'Consultation',
  'Other',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY_FORM = { name: '', email: '', projectType: '', message: '' };

/** Mirrors the server rules so visitors get immediate feedback. */
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.projectType) errors.projectType = 'Please choose a project type.';
  if (!values.message.trim()) errors.message = 'Please tell us about your project.';
  else if (values.message.trim().length < 10) {
    errors.message = 'Please add a little more detail.';
  }

  return errors;
}

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  const fieldId = (field) => `${uid}-${field}`;

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setFormError('');
      return;
    }

    setStatus('submitting');
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectType: values.projectType,
          message: values.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.errors?.form ?? 'We could not send your message. Please check the form and try again.',
        );
        setStatus('error');
        return;
      }

      setValues(EMPTY_FORM);
      setErrors({});
      setStatus('success');
    } catch {
      setFormError('We could not reach the studio. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-status form-status--success" role="status">
        <p>
          Thank you — your message has been received by the studio and stored for review. We reply
          to every enquiry within two working days.
        </p>
        <div className="form-actions">
          <button type="button" className="button" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && (
        <p className="form-status form-status--error" role="alert">
          {formError}
        </p>
      )}

      <div className="field">
        <label className="field__label" htmlFor={fieldId('name')}>
          Full name
        </label>
        <input
          id={fieldId('name')}
          className="field__control"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
        />
        {errors.name && (
          <p className="field__error" id={`${fieldId('name')}-error`}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={fieldId('email')}>
          Email address
        </label>
        <input
          id={fieldId('email')}
          className="field__control"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${fieldId('email')}-error` : undefined}
        />
        {errors.email && (
          <p className="field__error" id={`${fieldId('email')}-error`}>
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={fieldId('projectType')}>
          Project type
        </label>
        <select
          id={fieldId('projectType')}
          className="field__control"
          name="projectType"
          value={values.projectType}
          onChange={handleChange('projectType')}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? `${fieldId('projectType')}-error` : undefined}
        >
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="field__error" id={`${fieldId('projectType')}-error`}>
            {errors.projectType}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={fieldId('message')}>
          Project message
        </label>
        <textarea
          id={fieldId('message')}
          className="field__control"
          name="message"
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fieldId('message')}-error` : undefined}
        />
        {errors.message && (
          <p className="field__error" id={`${fieldId('message')}-error`}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="button button--solid" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
          {!isSubmitting && <ArrowIcon className="arrow-link__arrow" width={22} />}
        </button>
        <p className="contact-form__note">Your details are only used to reply to this enquiry.</p>
      </div>
    </form>
  );
}
