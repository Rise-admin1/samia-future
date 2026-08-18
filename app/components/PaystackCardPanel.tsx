'use client';

import React, { useState } from 'react';
import { BACKEND_URL, SAMIA_PAYSTACK_PUBLIC_KEY } from '@/lib/backend';

export function PaystackCardPanel({
  amount,
  onSuccess,
}: {
  amount: string;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const kes = Math.round(Number(amount));
  const amountOk = Number.isFinite(kes) && kes >= 50;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!SAMIA_PAYSTACK_PUBLIC_KEY) {
      setError('Card payments are not configured yet. Add NEXT_PUBLIC_SAMIA_PAYSTACK_PUBLIC_KEY.');
      return;
    }
    if (!emailOk) {
      setError('Enter a valid email address.');
      return;
    }
    if (!amountOk) {
      setError('Enter at least 50 KES.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/samia-future/paystack/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: kes, email: email.trim() }),
      });
      const data = await response.json();
      if (!response.ok || !data.accessCode) {
        throw new Error(data.msg || 'Could not start card payment');
      }

      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();
      popup.resumeTransaction(data.accessCode, {
        onSuccess: async (transaction: { reference?: string }) => {
          try {
            const reference = transaction?.reference || data.reference;
            const verifyRes = await fetch(
              `${BACKEND_URL}/api/samia-future/paystack/verify/${encodeURIComponent(reference)}`
            );
            const verifyData = await verifyRes.json();
            if (verifyData.status === 'success') {
              onSuccess();
            } else {
              setError(verifyData.msg || 'Payment could not be confirmed yet.');
            }
          } catch {
            setError('Payment may have gone through. Please wait a moment and try again if you were not charged.');
          } finally {
            setSubmitting(false);
          }
        },
        onCancel: () => {
          setError('Payment cancelled.');
          setSubmitting(false);
        },
        onError: (paystackError: { message?: string }) => {
          setError(paystackError?.message || 'Card payment failed');
          setSubmitting(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start card payment');
      setSubmitting(false);
    }
  };

  if (!SAMIA_PAYSTACK_PUBLIC_KEY) {
    return (
      <p className="text-sm text-grow-blue/70">
        Card payments are not configured yet. Add NEXT_PUBLIC_SAMIA_PAYSTACK_PUBLIC_KEY and a Kenya Paystack secret key on the backend.
      </p>
    );
  }

  return (
    <form onSubmit={handlePay} className="space-y-6">
      <div>
        <label htmlFor="card-email" className="block text-xs font-bold uppercase tracking-widest mb-2">
          Email
        </label>
        <input
          id="card-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full text-xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="mt-2 text-xs text-grow-blue/50">
          Paystack needs an email for the receipt. Minimum 50 KES. Visa and Mastercard.
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !amountOk}
        className="w-full bg-grow-blue text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
      >
        {submitting ? 'Opening card payment…' : 'Pay with card'}
      </button>
    </form>
  );
}
