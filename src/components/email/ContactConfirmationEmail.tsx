import React from 'react';

interface ContactConfirmationEmailProps {
  name: string;
}

// Basic inline styles for better email client compatibility
const containerStyle: React.CSSProperties = {
  fontFamily: '"Inter", Arial, sans-serif',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  maxWidth: '600px',
  margin: '20px auto',
  borderRadius: '8px',
  border: '1px solid #ddd',
};

const headerStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#333',
  marginBottom: '15px',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#555',
  lineHeight: '1.6',
};

const footerStyle: React.CSSProperties = {
  marginTop: '20px',
  fontSize: '12px',
  color: '#888',
  textAlign: 'center',
};

const ContactConfirmationEmail: React.FC<Readonly<ContactConfirmationEmailProps>> = ({
  name,
}) => (
  <div style={containerStyle}>
    <h1 style={headerStyle}>Thanks for reaching out, {name}!</h1>
    <p style={paragraphStyle}>
      I've received your message and appreciate you contacting me. I'll review
      it and get back to you as soon as possible.
    </p>
    <p style={paragraphStyle}>
      In the meantime, feel free to connect with me on LinkedIn or GitHub.
    </p>
    <p style={paragraphStyle}>
      Best regards,
      <br />
      Sayan Maity
    </p>
    <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '20px 0' }} />
    <p style={footerStyle}>
      This is an automated confirmation. Please do not reply directly to this email.
      <br />
      &copy; {new Date().getFullYear()} sayanmaity.com
    </p>
  </div>
);

export default ContactConfirmationEmail;