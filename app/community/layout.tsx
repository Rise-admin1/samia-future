import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Samia Future',
  description:
    'People, ideas, and initiatives shaping Samia\'s shared future. Youth leadership, enterprise support, community cohesion, and stories.',
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
