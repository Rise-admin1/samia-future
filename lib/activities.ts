export type ActivityCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  image?: string;
  imageMobile?: string;
  imageAlt?: string;
};

export const ACTIVITIES: ActivityCard[] = [
  {
    id: 'women-expo',
    label: 'Enterprise',
    title: 'Samia Women Business Expo',
    body: "The Samia Women Business Expo brought women's groups together for a full day of engagement, a shared space for group leaders to present their business ideas, exchange practical insights, and connect with support for growing what they'd already built. Groups came in from across the wards, seated and ready from early morning, for a day built entirely around enterprise and collaboration rather than ceremony.",
    image: '/banner-1.jpeg',
    imageMobile: '/banner-1-portrait.jpeg',
    imageAlt: 'Samia Women Business Expo',
  },
  {
    id: 'outreach',
    label: 'Community',
    title: 'Community Outreach',
    body: "Behind the Expo was months of groundwork: coordinating women's groups ward by ward, encouraging already active groups to register and organize, and bringing scattered efforts into one visible movement. This outreach was less about a single event and more about building the network of women's groups that the Expo, and the work after it, depends on. Outreach is successful when it meets generous support.",
    image: '/banner-2.jpeg',
    imageMobile: '/banner-2-portrait.jpeg',
    imageAlt: 'Community outreach for the Samia Women Business Expo',
  },
  {
    id: 'youth-arts',
    label: 'Arts & Livelihoods',
    title: 'Creative Talent, Real Income',
    body: 'MTCM Foundation has backed young artists who taught themselves their craft, helping them turn raw talent into paid work. Among them is Tanzi Boy, a musician from Samia, known for dance and songs that youth relate to. And also, artist Tariq Oyaro Momanyi, known for intricate portrait pieces built entirely from thousands of pins (geometric art) and stretched thread, a demanding craft worked entirely by hand and rarely seen outside specialist studios, featuring President William Ruto and the late Right Hon. Raila Odinga. With support behind them, recorded songs and finished pieces have gone from personal projects to commissioned, ongoing studio time and framed work. It\'s proof that backing a young artist properly can turn talent into a livelihood, not just a hobby.',
    image: '/artwork.jpeg',
    imageMobile: '/artwork.jpeg',
    imageAlt: 'Pin and thread portraits of President William Ruto and the late Rt. Hon. Raila Odinga',
  },
];
