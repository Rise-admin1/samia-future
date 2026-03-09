import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work - Samia Future',
  description:
    'Practical initiatives that develop leadership, strengthen enterprise, and advance community progress. Programs, focus areas, and community impact.',
};

export default function OurWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
