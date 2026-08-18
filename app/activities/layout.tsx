import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities - Samia Future',
  description:
    'Activities of the Michael Trufosa Clarice Mugenya Foundation. Support leadership, enterprise, and community programmes in Samia.',
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
