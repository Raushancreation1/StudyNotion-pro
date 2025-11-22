exports.loginAlertEmail = (name, ip, userAgent, timeString) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>New Login Alert</title>
      <style>
        body { background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; text-align: left; }
        .logo { max-width: 160px; margin: 0 auto 16px; display: block; }
        .message { font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center; }
        .body { font-size: 16px; margin-bottom: 20px; }
        .meta { background:#f7f7f7; padding:12px; border-radius:8px; }
        .meta p { margin: 6px 0; }
        .support { font-size: 14px; color: #999999; margin-top: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" />
        <div class="message">New Login to Your Account</div>
        <div class="body">
          <p>Hi ${name},</p>
          <p>We noticed a new login to your account. If this was you, you can safely ignore this message.</p>
          <div class="meta">
            <p><strong>Time:</strong> ${timeString}</p>
            <p><strong>IP:</strong> ${ip || 'Unknown'}</p>
            <p><strong>Device:</strong> ${userAgent || 'Unknown'}</p>
          </div>
          <p>If you don't recognize this activity, we recommend resetting your password immediately.</p>
        </div>
        <div class="support">Need help? Contact us at info@studynotion.com</div>
      </div>
    </body>
  </html>`
}
