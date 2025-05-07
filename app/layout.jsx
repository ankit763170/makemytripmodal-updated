import './globals.css';

export const metadata = {
  title: 'MakeMyTrip Clone',
  description: 'A clone of MakeMyTrip welcome modal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 