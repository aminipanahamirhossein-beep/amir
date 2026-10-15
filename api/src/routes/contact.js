import { Router } from 'express';
import { query } from '../db.js';

export const PROJECT_TYPES = [
  'Architecture',
  'Interior design',
  'Urban planning',
  'Consultation',
  'Other',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, email: 180, message: 4000 };

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/** Server-side validation — the source of truth for what gets stored. */
export function validateSubmission(payload = {}) {
  const value = {
    name: clean(payload.name),
    email: clean(payload.email),
    projectType: clean(payload.projectType),
    message: clean(payload.message),
  };
  const errors = {};

  if (!value.name) errors.name = 'Please enter your name.';
  else if (value.name.length > LIMITS.name) errors.name = 'Name is too long.';

  if (!value.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(value.email) || value.email.length > LIMITS.email) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!value.projectType) errors.projectType = 'Please choose a project type.';
  else if (!PROJECT_TYPES.includes(value.projectType)) {
    errors.projectType = 'Please choose a listed project type.';
  }

  if (!value.message) errors.message = 'Please tell us about your project.';
  else if (value.message.length < 10) errors.message = 'Please add a little more detail.';
  else if (value.message.length > LIMITS.message) errors.message = 'Message is too long.';

  return { value, errors };
}

const router = Router();

router.post('/', async (req, res) => {
  const { value, errors } = validateSubmission(req.body ?? {});

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    const { rows } = await query(
      `INSERT INTO contact_messages (name, email, project_type, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [value.name, value.email, value.projectType, value.message],
    );

    // Delivery note: submissions are persisted here. Outbound email is optional
    // and only runs when SMTP settings are provided (see README).
    if (process.env.SMTP_HOST && process.env.CONTACT_NOTIFICATION_EMAIL) {
      console.info(
        `[contact] message #${rows[0].id} stored; SMTP is configured but outbound mail is not enabled in this build.`,
      );
    }

    return res.status(201).json({ ok: true, id: rows[0].id });
  } catch (error) {
    console.error('[contact] failed to store submission', error);
    return res.status(500).json({
      ok: false,
      errors: { form: 'Something went wrong on our side. Please try again.' },
    });
  }
});

export default router;
