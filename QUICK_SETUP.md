# Quick EmailJS Setup (5 Minutes)

## Step 1: Sign Up (1 minute)
1. Go to **https://www.emailjs.com/**
2. Click "Sign Up" (use Google/GitHub for faster signup)
3. Verify your email

## Step 2: Add Email Service (2 minutes)
1. In dashboard, click **"Email Services"** → **"Add New Service"**
2. Choose **"Gmail"** (or your email provider)
3. Click **"Connect Account"** and authorize
4. **Copy the Service ID** (looks like: `service_xxxxx`)

## Step 3: Create Template (1 minute)
1. Click **"Email Templates"** → **"Create New Template"**
2. Choose the service you just created
3. Set these fields:
   - **To Email**: `sandeshpokharel47@gmail.com`
   - **Subject**: `New Contact from Portfolio - {{from_name}}`
   - **Content**:
     ```
     From: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```
4. Click **"Save"**
5. **Copy the Template ID** (looks like: `template_xxxxx`)

## Step 4: Get Public Key (30 seconds)
1. Click **"Account"** → **"General"**
2. Find **"Public Key"** (looks like: `xxxxxxxxxxxxx`)
3. **Copy it**

## Step 5: Configure (30 seconds)
Create a file named `.env` in the `portfolio` folder with:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Replace the values with what you copied!**

## Step 6: Restart Server
Stop your dev server (Ctrl+C) and run:
```bash
npm run dev
```

That's it! Your form will now send emails directly! 🎉

