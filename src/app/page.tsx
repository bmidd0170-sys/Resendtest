"use client";

import { useState } from "react";

const STORAGE_KEY = "self-mail-email";

export default function Home() {
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  });
  const [savedEmail, setSavedEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  });
  const [status, setStatus] = useState("Save an address to keep it in this browser.");
  const [isSending, setIsSending] = useState(false);

  const hasStoredEmail = savedEmail.length > 0;

  const isValidEmail = email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const saveEmail = () => {
    if (!isValidEmail) {
      setStatus("Enter a valid email address before saving.");
      return;
    }

    const nextEmail = email.trim();
    window.localStorage.setItem(STORAGE_KEY, nextEmail);
    setSavedEmail(nextEmail);
    setStatus(`Saved ${nextEmail} in this browser.`);
  };

  const sendEmailToSelf = async () => {
    const targetEmail = (savedEmail || email).trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      setStatus("Save a valid email first.");
      return;
    }

    setIsSending(true);
    setStatus("Sending email through Resend...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: targetEmail,
        }),
      });

      const payload: { error?: string; data?: { id?: string } } = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? "Something went wrong while sending the email.");
        return;
      }

      setStatus(`Email sent to ${targetEmail}. Message ID: ${payload.data?.id ?? "unknown"}`);
    } catch {
      setStatus("Unable to reach the email service.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.12),_transparent_28%),linear-gradient(135deg,#fffdf8_0%,#f7efe3_100%)] text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 sm:px-10 lg:px-12">
        <section className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center rounded-full border border-slate-900/10 bg-white/75 px-4 py-2 text-sm font-medium tracking-wide text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur">
              Self-email workspace
            </span>
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                Store your email once, then send a note to yourself in one tap.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
                Your address is saved locally in this browser. When you’re ready,
                the send button sends a real email through Resend to that same
                address.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Local only", "Saved with localStorage in this browser."],
                ["Fast reset", "Clear the browser data and start over anytime."],
                ["Self-send", "Posts to a server route that sends through Resend."],
              ].map(([title, copy]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-slate-900/10 bg-white/70 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur"
                >
                  <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-slate-950/5 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Email vault
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Keep one address ready
                </h2>
              </div>

              <div className="mt-8 space-y-5">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-slate-950/30 focus:ring-4 focus:ring-orange-500/10"
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={saveEmail}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Save email
                  </button>
                  <button
                    type="button"
                    onClick={sendEmailToSelf}
                    disabled={isSending}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-900/10 bg-white px-5 text-sm font-medium text-slate-950 transition hover:border-slate-900/20 hover:bg-slate-50"
                  >
                    {isSending ? "Sending..." : "Send to myself"}
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-4 text-sm leading-6 text-slate-100">
                <p className="font-medium text-white">Status</p>
                <p className="mt-1 text-slate-300">{status}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                <span className="rounded-full border border-slate-900/10 px-3 py-2">Stored locally</span>
                <span className="rounded-full border border-slate-900/10 px-3 py-2">Resend-backed send</span>
                {hasStoredEmail ? (
                  <span className="rounded-full border border-slate-900/10 px-3 py-2">Ready to send</span>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
