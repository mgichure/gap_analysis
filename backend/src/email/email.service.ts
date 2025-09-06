import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get('SMTP_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string, firstName?: string) {
    const resetUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'noreply@gapanalysis.com'),
      to: email,
      subject: 'Password Reset Request - Gap Analysis Platform',
      html: this.getPasswordResetEmailTemplate(firstName || 'User', resetUrl),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendWelcomeEmail(email: string, firstName: string, organizationName: string) {
    const loginUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/signin`;
    
    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'noreply@gapanalysis.com'),
      to: email,
      subject: 'Welcome to Gap Analysis Platform',
      html: this.getWelcomeEmailTemplate(firstName, organizationName, loginUrl),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  async sendAccountCreatedEmail(email: string, firstName: string, organizationName: string) {
    const loginUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/signin`;
    
    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'noreply@gapanalysis.com'),
      to: email,
      subject: 'Account Created Successfully - Gap Analysis Platform',
      html: this.getAccountCreatedEmailTemplate(firstName, organizationName, loginUrl),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Account created email sent to ${email}`);
    } catch (error) {
      console.error('Error sending account created email:', error);
      throw new Error('Failed to send account created email');
    }
  }

  private getPasswordResetEmailTemplate(firstName: string, resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>We received a request to reset your password for your Gap Analysis Platform account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px;">${resetUrl}</p>
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
          <div class="footer">
            <p>© 2024 Gap Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getWelcomeEmailTemplate(firstName: string, organizationName: string, loginUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Gap Analysis Platform</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Gap Analysis Platform!</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>Welcome to the Gap Analysis Platform! We're excited to have you and ${organizationName} on board.</p>
            <p>Your account has been successfully created and you can now access all the features of our comprehensive compliance management platform.</p>
            <a href="${loginUrl}" class="button">Get Started</a>
            <p>With our platform, you can:</p>
            <ul>
              <li>Manage compliance frameworks and standards</li>
              <li>Track requirements and evidence</li>
              <li>Monitor risks and actions</li>
              <li>Generate comprehensive reports</li>
              <li>Collaborate with your team</li>
            </ul>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>© 2024 Gap Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getAccountCreatedEmailTemplate(firstName: string, organizationName: string, loginUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Created Successfully</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Created Successfully!</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName},</h2>
            <p>Your account has been successfully created for ${organizationName} on the Gap Analysis Platform.</p>
            <p>You can now sign in to access your account and start managing your compliance requirements.</p>
            <a href="${loginUrl}" class="button">Sign In Now</a>
            <p>If you have any questions or need assistance getting started, please contact our support team.</p>
          </div>
          <div class="footer">
            <p>© 2024 Gap Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
