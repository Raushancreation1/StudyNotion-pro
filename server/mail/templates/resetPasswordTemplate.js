exports.resetPasswordTemplate = (resetLink) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
      <style>
        body { background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; }
        .logo { max-width: 200px; margin-bottom: 20px; }
        .message { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
        .body { font-size: 16px; margin-bottom: 20px; }
        .cta { display: inline-block; padding: 10px 20px; background-color: #FFD60A; color: #000000; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px; }
        .support { font-size: 14px; color: #999999; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://rccodingallinone.vercel.app/">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" />
        </a>
        <div class="message">Reset Your Password</div>
        <div class="body">
          <p>We received a request to reset your password.</p>
          <p>Click the button below to set a new password. This link will expire in 5 minutes.</p>
          <p>
            <a class="cta" href="${resetLink}" target="_blank" rel="noopener">Reset Password</a>
          </p>
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p><a href="${resetLink}" target="_blank" rel="noopener">${resetLink}</a></p>
        </div>
        <div class="support">If you didn't request a password reset, you can safely ignore this email.</div>
      </div>
    </body>
  </html>`
}
