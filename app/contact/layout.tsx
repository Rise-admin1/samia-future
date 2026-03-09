import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Samia Future',
  description:
    'Connect, collaborate, and build with Samia Future. General inquiries, program participation, and partnership opportunities.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
