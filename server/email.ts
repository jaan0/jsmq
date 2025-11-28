import nodemailer from 'nodemailer';

interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  serviceTitle: string;
  servicePrice: string;
  orderId: string;
  serviceIcon?: string;
}

// Map icon names to SVG icons
const getIconSvg = (iconName: string): string => {
  const icons: Record<string, string> = {
    'code': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    'shopping-cart': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    'building': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>',
    'smartphone': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>',
    'palette': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>',
    'zap': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
  };
  return icons[iconName] || icons['code']; // Default to code icon
};

// Create reusable transporter
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Emails will be logged to console only.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// Generate beautiful HTML email template
const generateOrderConfirmationEmail = (data: OrderConfirmationData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - JSMQ</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                JSMQ
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Professional Web Development Services
              </p>
            </td>
          </tr>

          <!-- Service Icon -->
          <tr>
            <td style="padding: 40px 30px 20px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
                ${getIconSvg(data.serviceIcon || 'code')}
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 10px; color: #1a1a1a; font-size: 28px; font-weight: 700; text-align: center;">
                Order Confirmed! 🎉
              </h2>
              <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6; text-align: center;">
                Thank you for choosing JSMQ! We've received your order and are excited to work with you.
              </p>

              <!-- Order Details Card -->
              <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 2px solid #e0e7ff;">
                <h3 style="margin: 0 0 16px; color: #667eea; font-size: 18px; font-weight: 600;">
                  Order Details
                </h3>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Order ID:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">#${data.orderId.substring(0, 8).toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Service:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${data.serviceTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Customer:</td>
                    <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${data.customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #d0d7ff; padding-top: 16px;">Total Amount:</td>
                    <td style="padding: 8px 0; color: #667eea; font-size: 20px; font-weight: 700; text-align: right; border-top: 1px solid #d0d7ff; padding-top: 16px;">${data.servicePrice}</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 16px; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                  What's Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">Our team will review your order within <strong>24-36 hours</strong></li>
                  <li style="margin-bottom: 8px;">You'll receive a detailed project proposal via email</li>
                  <li style="margin-bottom: 8px;">We'll schedule a consultation call to discuss your requirements</li>
                  <li style="margin-bottom: 0;">Upon confirmation, we'll begin working on your project</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 30px;">
                <p style="margin: 0 0 16px; color: #666666; font-size: 15px;">
                  Have questions? We're here to help!
                </p>
                <a href="mailto:support@jsmq.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Contact Support
                </a>
              </div>

              <!-- Hang Tight Message -->
              <div style="text-align: center; padding: 24px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #fbbf24;">
                <p style="margin: 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  🚀 Hang tight! Our team is preparing to bring your vision to life.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 14px;">
                © ${new Date().getFullYear()} JSMQ - Professional Web Development Services
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Based in Pakistan, Serving Clients Globally
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send order confirmation email
export async function sendOrderConfirmationEmail(data: OrderConfirmationData): Promise<void> {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"JSMQ Team" <${process.env.EMAIL_USER || 'noreply@jsmq.com'}>`,
    to: data.customerEmail,
    subject: `Order Confirmed - ${data.serviceTitle} | JSMQ`,
    html: generateOrderConfirmationEmail(data),
    text: `
Dear ${data.customerName},

Thank you for your order! We've received your request for ${data.serviceTitle}.

Order Details:
- Order ID: #${data.orderId.substring(0, 8).toUpperCase()}
- Service: ${data.serviceTitle}
- Amount: ${data.servicePrice}

What's Next?
Our team will review your order within 24-36 hours and reach out to you with a detailed project proposal. We'll schedule a consultation call to discuss your requirements and answer any questions you may have.

Hang tight! Our team is preparing to bring your vision to life.

If you have any immediate questions, feel free to reply to this email.

Best regards,
The JSMQ Team

---
JSMQ - Professional Web Development Services
Based in Pakistan, Serving Clients Globally
    `,
  };

  if (!transporter) {
    // If no transporter configured, log the email
    console.log('\n📧 ORDER CONFIRMATION EMAIL (Not sent - configure EMAIL_USER and EMAIL_PASS):');
    console.log(`To: ${data.customerEmail}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Customer: ${data.customerName}`);
    console.log(`Service: ${data.serviceTitle}`);
    console.log(`Amount: ${data.servicePrice}\n`);
    return;
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Order confirmation email sent to ${data.customerEmail}`);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    throw error;
  }
}
