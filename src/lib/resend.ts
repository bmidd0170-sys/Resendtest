import 'server-only';

import { Resend } from 'resend';

let resendInstance: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

export const resend = new Proxy({} as Resend, {
  get(_target, property) {
    return getResendClient()[property as keyof Resend];
  },
});