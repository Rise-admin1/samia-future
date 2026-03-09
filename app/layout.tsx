import type { Metadata } from 'next';
import './globals.css';
import { ContactProvider } from '@/app/components/ContactProvider';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Samia Future - Building Skills, Leadership, and Enterprise for Samia\u2019s Future',
  description: 'Building Skills, Leadership, and Enterprise for Samia\u2019s Future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grow-blue text-white overflow-x-hidden font-sans selection:bg-white selection:text-grow-blue">
        <ContactProvider>
          <Header />
          {children}
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
