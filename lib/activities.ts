export type ActivityCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  accent: 'yellow' | 'green' | 'cyan' | 'white';
};

export const ACTIVITIES: ActivityCard[] = [
  {
    id: 'leadership',
    label: 'Programs',
    title: 'Leadership Education',
    body: 'Workshops and seminars that build confidence, consciousness, and a future-ready mindset for youth and emerging leaders.',
    accent: 'yellow',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    title: 'Business Clinics & Expos',
    body: 'Practical support for micro and small enterprises through clinics, expos, and opportunity-linkage forums.',
    accent: 'green',
  },
  {
    id: 'youth',
    label: 'Community',
    title: 'Youth Leadership',
    body: 'Spaces where young people practise leadership, collaboration, and civic participation in Samia communities.',
    accent: 'cyan',
  },
  {
    id: 'consultancy',
    label: 'Advisory',
    title: 'Community Consultancy',
    body: 'Advisory support that helps grassroots groups turn ideas into structured, lasting initiatives.',
    accent: 'white',
  },
  {
    id: 'mentorship',
    label: 'Growth',
    title: 'Mentorship',
    body: 'One-to-one and group mentorship that connects emerging talent with experienced practitioners.',
    accent: 'yellow',
  },
  {
    id: 'grassroots',
    label: 'Impact',
    title: 'Grassroots Enterprise',
    body: 'Skills, networks, and platforms that strengthen local livelihoods and inclusive economic participation.',
    accent: 'green',
  },
];
