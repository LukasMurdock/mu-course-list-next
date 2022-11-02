import '@/styles/globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>MU Course List</title>
      </head>
      <body>
        <nav className="m-auto flex max-w-prose justify-between py-4">
          <h1 className="font-bold">
            <Link href="/">MU Course List</Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
