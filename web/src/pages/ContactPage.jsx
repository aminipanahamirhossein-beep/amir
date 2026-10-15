import ContactForm from '../components/ContactForm.jsx';
import SectionIndex from '../components/SectionIndex.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { contact, contactCta } from '../data/site.js';

export default function ContactPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="contact-page__grid">
          <div className="contact-page__intro">
            <SectionIndex index={contactCta.index} />
            <h1 className="page-title">
              {contactCta.headingLines.map((line) => (
                <span key={line} className="contact-cta__title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="page-lede">{contactCta.paragraph}</p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-detail__label">Email</span>
                <a className="contact-detail__value" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div className="contact-detail">
                <span className="contact-detail__label">Studio</span>
                <span className="contact-detail__value">{contact.studio}</span>
              </div>
              <div className="contact-detail">
                <span className="contact-detail__label">Response</span>
                <span className="contact-detail__value">{contact.responseTime}</span>
              </div>
            </div>

            <SocialLinks className="footer-socials" />
          </div>

          <div>
            <h2 className="sr-only">Contact form</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
