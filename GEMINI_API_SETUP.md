# Fix Gemini API "Model Not Found" Error

## The Problem
If you're getting "models/gemini-xxx is not found" errors, it means your API key doesn't have access to the Gemini models. This usually happens when the Generative Language API isn't enabled for your Google Cloud project.

## Solution: Enable the API

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with the same Google account you used to create the API key

### Step 2: Select or Create a Project
1. Click the project dropdown at the top
2. Either select your existing project or create a new one

### Step 3: Enable Generative Language API
1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Or search for "Generative Language API" in the API Library
3. Click **"Enable"** button
4. Wait for it to enable (usually takes a few seconds)

### Step 4: Verify API Key
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your API key
3. Make sure it has access to "Generative Language API"
4. If not, you may need to create a new API key with the API enabled

### Step 5: Test Again
1. Restart your dev server: `npm run dev`
2. Try the chatbot again
3. Check browser console (F12) - it should now list available models

## Alternative: Create New API Key with API Enabled

If the above doesn't work:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. **Before creating**, make sure "Generative Language API" is enabled
4. Copy the new API key
5. Update your `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your-new-api-key-here
   ```
6. Restart dev server

## Quick Test

After enabling the API, the chatbot will automatically:
1. List all available models
2. Try each one until it finds one that works
3. Show in console which model it's using

## Still Not Working?

1. **Check API Quota**: Make sure you haven't exceeded free tier limits
2. **Check API Status**: https://status.cloud.google.com/
3. **Verify API Key**: Make sure the key in `.env` matches the one in Google Cloud Console
4. **Check Browser Console**: Look for detailed error messages (F12)

## Fallback Mode

If the API still doesn't work, the chatbot will automatically use fallback mode (no API needed) which answers common questions using pattern matching.

