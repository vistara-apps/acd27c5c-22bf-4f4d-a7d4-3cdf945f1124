import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'RemixFiesta - AI-Powered Content Remixing',
  description: 'Easily remix audio & video, automatically share royalties.',
  openGraph: {
    title: 'RemixFiesta',
    description: 'Easily remix audio & video, automatically share royalties.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
