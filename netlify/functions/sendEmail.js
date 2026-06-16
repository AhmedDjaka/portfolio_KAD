const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid request body' };
  }

  const { name, email, subject = 'Message depuis le portfolio', message } = data;

  if (!name || !email || !message) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // SMTP configuration via environment variables
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const recipient = process.env.RECIPIENT_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials are not configured');
    return { statusCode: 500, body: 'SMTP not configured' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const ownerMail = {
    from: `Portfolio <${smtpUser}>`,
    to: recipient,
    subject: `Nouveau message de ${name} — ${subject}`,
    text: `Vous avez reçu un nouveau message depuis votre portfolio.\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
    html: `<p>Vous avez reçu un nouveau message depuis votre portfolio.</p>
           <p><strong>Nom:</strong> ${name}<br/>
           <strong>Email:</strong> ${email}<br/>
           <strong>Sujet:</strong> ${subject}</p>
           <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
  };

  const confirmMail = {
    from: `KAD — Confirmation <${smtpUser}>`,
    to: email,
    subject: 'Merci pour votre message — Réception confirmée',
    text: `Bonjour ${name},\n\nMerci pour votre message. Je l'ai bien reçu et je reviendrai vers vous dès que possible.\n\nCordialement,\nKONE AHMED DJAKARIDJA`,
    html: `<p>Bonjour ${name},</p>
           <p>Merci pour votre message. Je l'ai bien reçu et je reviendrai vers vous dès que possible.</p>
           <p>Cordialement,<br/>KONE AHMED DJAKARIDJA</p>`
  };

  try {
    await transporter.sendMail(ownerMail);
    await transporter.sendMail(confirmMail);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error('Error sending email', err);
    return { statusCode: 500, body: 'Error sending email' };
  }
};
