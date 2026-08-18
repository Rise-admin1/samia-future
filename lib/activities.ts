export type ActivityCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
  imageMobile: string;
  imageAlt: string;
};

export const ACTIVITIES: ActivityCard[] = [
  {
    id: 'women-expo',
    label: 'Enterprise',
    title: 'Samia Women Business Expo',
    body: 'The upcoming Samia Women Business Expo is an initiative that focuses on mobilizing and empowering women through entrepreneurship and business collaboration.',
    image: '/banner-1.jpeg',
    imageMobile: '/banner-1-portrait.jpeg',
    imageAlt: 'Samia Women Business Expo',
  },
  {
    id: 'outreach',
    label: 'Community',
    title: 'Community Outreach',
    body: 'Community outreach design for the Samia Women Business Expo highlights efforts to bring women together to share ideas, build business groups, and expand economic opportunities.',
    image: '/banner-2.jpeg',
    imageMobile: '/banner-2-portrait.jpeg',
    imageAlt: 'Community outreach for the Samia Women Business Expo',
  },
];
