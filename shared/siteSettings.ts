import { z } from "zod";

// Social media platform schema
export const socialLinkSchema = z.object({
  platform: z.enum(["facebook", "twitter", "instagram", "linkedin", "github"]),
  url: z.string().optional().or(z.literal("")),
  visible: z.boolean().default(true),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

// Site settings schema
export const siteSettingsSchema = z.object({
  id: z.string().optional(),

  // Contact Information
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  contactAddress: z.string(),

  // Social Media Links
  socialLinks: z.array(socialLinkSchema),

  // Footer Branding
  companyName: z.string().default("JSMQ"),
  footerTagline: z.string().default("Creating exceptional digital experiences that drive business growth and success."),

  // Legal Content
  privacyPolicy: z.string().default(""),
  termsOfService: z.string().default(""),
  cookiePolicy: z.string().default(""),

  // Metadata
  updatedAt: z.date().optional(),
});

export const insertSiteSettingsSchema = siteSettingsSchema.omit({ id: true, updatedAt: true });
export const updateSiteSettingsSchema = siteSettingsSchema.omit({ id: true, updatedAt: true }).partial();

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type UpdateSiteSettings = z.infer<typeof updateSiteSettingsSchema>;

// Default site settings with comprehensive legal templates
export const defaultSiteSettings: InsertSiteSettings = {
  contactEmail: "contact@jsmqwebflow.com",
  contactPhone: "+1 (555) 123-4567",
  contactAddress: "123 Business St, Suite 100\nNew York, NY 10001",
  socialLinks: [
    { platform: "facebook", url: "", visible: false },
    { platform: "twitter", url: "", visible: false },
    { platform: "instagram", url: "", visible: false },
    { platform: "linkedin", url: "", visible: false },
    { platform: "github", url: "", visible: false },
  ],
  companyName: "JSMQ",
  footerTagline: "Creating exceptional digital experiences that drive business growth and success.",
  privacyPolicy: `# Privacy Policy

**Last Updated:** December 1, 2025

## Introduction
Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

## Information We Collect
We may collect information about you in a variety of ways, including:
- **Personal Data:** Name, email address, phone number
- **Usage Data:** IP address, browser type, pages visited
- **Cookies:** We use cookies to enhance your experience

## How We Use Your Information
We use the information we collect to:
- Provide and maintain our services
- Improve our website and services
- Communicate with you
- Send marketing communications (with your consent)

## Data Security
We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.

## Third-Party Services
We may employ third-party companies and individuals to facilitate our services. These third parties have access to your information only to perform tasks on our behalf.

## Your Rights
You have the right to:
- Access your personal data
- Request correction of your data
- Request deletion of your data
- Opt-out of marketing communications

## Contact Us
If you have questions about this Privacy Policy, please contact us at:
- Email: contact@jsmqwebflow.com
- Phone: +1 (555) 123-4567`,

  termsOfService: `# Terms of Service

**Last Updated:** December 1, 2025

## Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

## Use License
Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.

### This license shall automatically terminate if you violate any of these restrictions.

## Disclaimer
The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.

## Limitations
In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use our services.

## Accuracy of Materials
The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.

## Links
We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site.

## Modifications
We may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms.

## Governing Law
These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.

## Contact Information
For questions about these Terms of Service, contact us at:
- Email: contact@jsmqwebflow.com
- Phone: +1 (555) 123-4567`,

  cookiePolicy: `# Cookie Policy

**Last Updated:** December 1, 2025

## What Are Cookies?
Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

## How We Use Cookies
We use cookies for the following purposes:

| Type of Cookie        | Purpose                                                                                                                                      |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Essential Cookies** | These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. |
| **Analytics Cookies** | We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.      |
| **Marketing Cookies** | These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.        |

## Types of Cookies We Use
- **Session Cookies:** Temporary cookies that expire when you close your browser
- **Persistent Cookies:** Cookies that remain on your device until deleted or expired
- **First-Party Cookies:** Set by our website
- **Third-Party Cookies:** Set by external services we use

## Managing Cookies
You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.

### Browser Settings
- **Chrome:** Settings > Privacy and Security > Cookies
- **Firefox:** Settings > Privacy & Security > Cookies
- **Safari:** Preferences > Privacy > Cookies
- **Edge:** Settings > Privacy > Cookies

## Impact of Disabling Cookies
If you disable cookies, some features of our website may not function properly, and your user experience may be affected.

## Updates to This Policy
We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## Contact Us
If you have questions about our use of cookies, please contact us at:
- Email: contact@jsmqwebflow.com
- Phone: +1 (555) 123-4567`,
};
