# Email Configuration Setup

This document explains how to configure email notifications for the Gap Analysis Platform.

## Features

The platform includes the following email notifications:

1. **Password Reset Emails** - Sent when users request password reset
2. **Welcome Emails** - Sent to new users after successful signup
3. **Account Created Emails** - Sent when accounts are created

## Environment Variables

Add the following environment variables to your `.env` file:

```bash
# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@gapanalysis.com"

# Frontend URL (for email links)
FRONTEND_URL="http://localhost:3000"
```

## Gmail Setup

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account > Security > 2-Step Verification
- Click "App passwords"
- Generate a new app password for "Mail"
- Use this password as `SMTP_PASS`

### 3. Configure Environment
```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-character-app-password"
SMTP_FROM="noreply@yourdomain.com"
```

## Other Email Providers

### SendGrid
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
SMTP_FROM="noreply@yourdomain.com"
```

### Mailgun
```bash
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT=587
SMTP_USER="your-mailgun-smtp-username"
SMTP_PASS="your-mailgun-smtp-password"
SMTP_FROM="noreply@yourdomain.com"
```

### AWS SES
```bash
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT=587
SMTP_USER="your-ses-smtp-username"
SMTP_PASS="your-ses-smtp-password"
SMTP_FROM="noreply@yourdomain.com"
```

## Testing Email Configuration

1. Start the backend server
2. Try the forgot password flow:
   - Go to `/forgot-password`
   - Enter a valid email address
   - Check your email for the reset link

## Email Templates

The platform includes beautiful HTML email templates for:

- **Password Reset**: Professional design with clear call-to-action
- **Welcome Email**: Onboarding information and next steps
- **Account Created**: Confirmation and login instructions

All templates are responsive and include:
- Company branding
- Clear instructions
- Security notices
- Professional styling

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check your SMTP credentials
   - Ensure 2FA is enabled for Gmail
   - Verify app password is correct

2. **Connection Timeout**
   - Check SMTP_HOST and SMTP_PORT
   - Verify firewall settings
   - Test with a different email provider

3. **Emails Not Received**
   - Check spam folder
   - Verify SMTP_FROM address
   - Test with different email addresses

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV="development"
```

This will log email sending attempts to the console.

## Security Notes

- Never commit email credentials to version control
- Use environment variables for all sensitive data
- Consider using a dedicated email service for production
- Implement rate limiting for password reset requests
- Set appropriate token expiration times

## Production Considerations

1. **Dedicated Email Service**: Use services like SendGrid, Mailgun, or AWS SES
2. **Domain Authentication**: Set up SPF, DKIM, and DMARC records
3. **Rate Limiting**: Implement rate limiting for email endpoints
4. **Monitoring**: Set up email delivery monitoring
5. **Backup Provider**: Have a fallback email service
