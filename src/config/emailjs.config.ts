/**
 * EmailJS Configuration
 * 
 * IMPORTANT SECURITY NOTE:
 * EmailJS "Public Key" is designed to be public and safe to expose in client-side code.
 * It's not a secret - EmailJS uses rate limiting and domain restrictions for security.
 * 
 * This config uses environment variables if set, otherwise falls back to default values.
 * For production, you can override these with environment variables in your hosting platform.
 * For local development, you can create a .env file to override (see .env.example)
 */

const getEmailJSConfig = () => {
  // Use environment variables if available, otherwise use fallback values
  // These fallback values are your working EmailJS credentials
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_w6wyvgy'
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bga9zhl'
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Pj6BlXTKG-BraP41_'

  // Validate that we have valid values
  if (!serviceId || !templateId || !publicKey) {
    if (import.meta.env.MODE === 'development') {
      console.error(
        '⚠️ EmailJS configuration error. ' +
        'Please check your EmailJS credentials.'
      )
    }
    return null
  }

  return {
    serviceId,
    templateId,
    publicKey,
  }
}

export default getEmailJSConfig

