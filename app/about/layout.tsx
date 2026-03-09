import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Samia Future',
  description:
    'A long-term platform for leadership, learning, and community advancement. Samia Future is committed to the long-term empowerment of the Samia Community.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
