import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities - Samia Future',
  description:
    'Samia Future funds and stands behind work MTCM Foundation delivers on the ground, including the Samia Women Business Expo, community outreach, and youth employment through the arts.',
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
