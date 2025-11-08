# EmailJS Setup Instructions

To enable the contact form to send emails directly, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

## Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:
   ```
   Subject: New Contact from Portfolio - {{from_name}}
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
4. Set "To Email" to: sandeshpokharel47@gmail.com
5. Copy your **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (also called API Key)

## Step 5: Update Contact.tsx
Replace these values in `src/components/Contact.tsx`:
- `serviceId`: Your Service ID
- `templateId`: Your Template ID  
- `publicKey`: Your Public Key

## Alternative: Quick Setup with Default Values
If you want to test quickly, EmailJS provides default test credentials that you can use during development.

## Free Tier Limits
- 200 emails per month
- Perfect for portfolio contact forms

