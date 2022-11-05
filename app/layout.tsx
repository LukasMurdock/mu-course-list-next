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
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MU Course List</title>
      </head>
      <body className="p-4">
        <nav className="m-auto flex max-w-prose justify-between pb-4">
          <h1 className="font-bold">
            <Link href="/">MU Course List</Link>
          </h1>
        </nav>
        <main>{children}</main>
        <footer className="m-auto flex max-w-prose justify-between pt-20 pb-4 text-sm font-medium text-gray-500">
          <p>
            Made by{' '}
            <a
              href="https://lukasmurdock.com/"
              className="text-black underline"
            >
              Lukas Murdock
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
