import 'server-only';

import type { CreateEmailOptions } from 'resend';

import { resend } from './resend';

export type SendEmailOptions = CreateEmailOptions;

export async function sendEmail(options: SendEmailOptions) {
  return resend.emails.send(options);
}