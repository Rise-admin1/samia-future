'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, X } from 'lucide-react';
import { BACKEND_URL } from '@/lib/backend';
import { formatPhoneNumber, isValidKenyanPhone } from '@/lib/phone';
import { PaystackCardPanel } from '@/app/components/PaystackCardPanel';

type Method = 'mpesa' | 'card' | 'cheque';
type PaymentStatus = 'pending' | 'success' | 'failed' | null;

const CHEQUE_PAYEE = 'Michael Trufosa Clarice Mugenya Foundation';
const CHEQUE_ADDRESS = '317 Runda Grove, Runda, Nairobi, Kenya.';

export const CheckoutDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<Method>('mpesa');
  const [cardMounted, setCardMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  const paystackReferenceRef = useRef<string | null>(null);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paymentStatusRef = useRef<PaymentStatus>(null);

  paymentStatusRef.current = paymentStatus;

  const clearPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPolling();
  }, []);

  useEffect(() => {
    if (method === 'card') setCardMounted(true);
  }, [method]);

  const resetState = () => {
    clearPolling();
    setAmount('');
    setPhoneNumber('');
    setEmail('');
    setMethod('mpesa');
    setCardMounted(false);
    setCopied(false);
    setMpesaLoading(false);
    setMpesaMessage('');
    setPaymentStatus(null);
    setStatusMessage('');
    setSucceeded(false);
    paystackReferenceRef.current = null;
  };

  const handleClose = () => {
    const busy = paymentStatus === 'pending' || mpesaLoading;
    if (busy && typeof window !== 'undefined') {
      const proceed = window.confirm('Payment is in progress. Close anyway?');
      if (!proceed) return;
    }
    onClose();
    setTimeout(resetState, 300);
  };

  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/samia-future/paystack/verify/${encodeURIComponent(reference)}`
      );
      const data = await response.json();

      if (data.status === 'success') {
        setPaymentStatus('success');
        setStatusMessage(data.msg || 'Payment successful!');
        setSucceeded(true);
        clearPolling();
      } else if (data.status === 'failed') {
        setPaymentStatus('failed');
        setStatusMessage(data.msg || 'Payment failed');
        clearPolling();
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const handleMpesaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMpesaLoading(true);
    setMpesaMessage('');
    setPaymentStatus(null);
    setStatusMessage('');
    clearPolling();

    const formattedPhone = formatPhoneNumber(phoneNumber);
    const kes = Math.round(Number(amount));
    const trimmedEmail = email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidKenyanPhone(formattedPhone)) {
      setMpesaMessage('Please enter a valid phone number (e.g. 072xxxxxxx).');
      setMpesaLoading(false);
      return;
    }

    if (!emailOk) {
      setMpesaMessage('Please enter a valid email address.');
      setMpesaLoading(false);
      return;
    }

    if (!Number.isFinite(kes) || kes < 10) {
      setMpesaMessage('Enter at least 10 KES.');
      setMpesaLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/samia-future/paystack/mpesa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: kes,
          email: trimmedEmail,
        }),
      });
      const data = await response.json();

      if (data.status && data.reference) {
        setMpesaMessage(data.msg || 'Check your phone and enter your M-Pesa PIN.');
        setPaymentStatus('pending');
        setStatusMessage('Waiting for payment confirmation…');
        paystackReferenceRef.current = data.reference;

        pollingIntervalRef.current = setInterval(() => {
          if (paystackReferenceRef.current) {
            checkPaymentStatus(paystackReferenceRef.current);
          }
        }, 3000);

        pollingTimeoutRef.current = setTimeout(() => {
          clearPolling();
          if (paymentStatusRef.current === 'pending') {
            setPaymentStatus('failed');
            setStatusMessage('Payment timeout. Please try again.');
          }
        }, 300000);

        setTimeout(() => {
          if (paystackReferenceRef.current) {
            checkPaymentStatus(paystackReferenceRef.current);
          }
        }, 2000);
      } else {
        setMpesaMessage(data.msg || 'Failed to start M-Pesa payment');
        setPaymentStatus('failed');
        setStatusMessage(data.msg || 'Failed to initiate payment');
      }
    } catch {
      setMpesaMessage('Something went wrong. Please try again.');
      setPaymentStatus('failed');
      setStatusMessage('Network error');
    } finally {
      setMpesaLoading(false);
    }
  };

  const copyPayee = async () => {
    try {
      await navigator.clipboard.writeText(CHEQUE_PAYEE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const tabs: { id: Method; label: string }[] = [
    { id: 'mpesa', label: 'M-Pesa' },
    { id: 'card', label: 'Card' },
    { id: 'cheque', label: 'Cheque' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-grow-blue/95 p-4"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-grow-blue rounded-3xl p-8 md:p-12 shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 hover:bg-grow-blue/5 rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X size={32} />
            </button>

            {succeeded ? (
              <div className="text-center space-y-6 py-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Thank You</h2>
                <p className="text-lg text-grow-blue/80">
                  Your support helps Samia Future keep these activities going.
                </p>
                {statusMessage && (
                  <p className="text-sm text-grow-blue/60">{statusMessage}</p>
                )}
                <button
                  onClick={handleClose}
                  className="bg-grow-blue text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2 pr-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Support our work</h2>
                  <div className="h-1 w-12 bg-grow-blue" />
                  <p className="text-sm text-grow-blue/70">
                    Choose how you would like to contribute. Amounts are in Kenyan Shillings.
                  </p>
                </div>

                {method !== 'cheque' && (
                  <div>
                    <label htmlFor="donation-amount" className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Amount (KES)
                    </label>
                    <input
                      id="donation-amount"
                      type="number"
                      min={method === 'card' ? 50 : 10}
                      step="1"
                      inputMode="numeric"
                      placeholder={method === 'card' ? '50' : '10'}
                      className="w-full text-xl md:text-2xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMethod(tab.id)}
                      className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border-2 transition-colors ${
                        method === tab.id
                          ? 'bg-grow-blue text-white border-grow-blue'
                          : 'border-grow-blue/20 text-grow-blue hover:border-grow-blue'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className={method === 'mpesa' ? 'block' : 'hidden'}>
                  <form onSubmit={handleMpesaSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="mpesa-email" className="block text-xs font-bold uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        id="mpesa-email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full text-xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={method === 'mpesa'}
                      />
                    </div>
                    <div>
                      <label htmlFor="mpesa-phone" className="block text-xs font-bold uppercase tracking-widest mb-2">
                        M-Pesa phone
                      </label>
                      <input
                        id="mpesa-phone"
                        type="tel"
                        placeholder="072xxxxxxx"
                        className="w-full text-xl font-bold border-b-2 border-grow-blue/20 py-4 focus:outline-none focus:border-grow-blue transition-colors"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={method === 'mpesa'}
                      />
                      <p className="mt-2 text-xs text-grow-blue/50">Format: 072xxxxxxx or 25472xxxxxxx. Minimum 10 KES.</p>
                    </div>

                    {mpesaMessage && (
                      <p className={`text-sm ${mpesaMessage.toLowerCase().includes('check your phone') ? 'text-grow-blue' : 'text-red-600'}`}>
                        {mpesaMessage}
                      </p>
                    )}

                    {paymentStatus && (
                      <div
                        className={`p-3 rounded-2xl text-sm font-medium ${
                          paymentStatus === 'success'
                            ? 'bg-grow-green/20 text-grow-blue'
                            : paymentStatus === 'failed'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-grow-yellow/30 text-grow-blue'
                        }`}
                      >
                        {statusMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={mpesaLoading || paymentStatus === 'pending'}
                      className="w-full bg-grow-blue text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {mpesaLoading || paymentStatus === 'pending' ? 'Waiting for PIN…' : 'Pay with M-Pesa'}
                    </button>
                  </form>
                </div>

                <div className={method === 'card' ? 'block' : 'hidden'}>
                  {cardMounted && (
                    <PaystackCardPanel amount={amount} onSuccess={() => setSucceeded(true)} />
                  )}
                </div>

                <div className={method === 'cheque' ? 'block' : 'hidden'}>
                  <div className="space-y-6">
                    <p className="text-sm text-grow-blue/80">
                      Write a cheque payable to the foundation and post or deliver it to our Nairobi address.
                    </p>
                    <div className="rounded-2xl border border-grow-blue/15 p-6 space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-grow-blue/50 mb-2">
                          Payee
                        </p>
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-bold text-lg leading-snug">{CHEQUE_PAYEE}</p>
                          <button
                            type="button"
                            onClick={copyPayee}
                            className="flex-shrink-0 p-2 rounded-full hover:bg-grow-blue/5"
                            aria-label="Copy payee name"
                          >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-grow-blue/50 mb-2">
                          Mail to
                        </p>
                        <p className="font-bold">{CHEQUE_ADDRESS}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
