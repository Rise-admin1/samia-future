import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opportunities - Samia Future',
  description:
    'Ways to learn, participate, and contribute to Samia\'s shared progress. Learning, mentorship, partnerships, and events.',
};

export default function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
