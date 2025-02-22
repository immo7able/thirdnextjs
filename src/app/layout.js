'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import Link from 'next/link';
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body>
        <ThemeProvider>
            <nav className="p-4 flex justify-between bg-gray-200 dark:bg-gray-800">
                <div>
                    <Link href="/" className="mr-4">Home</Link>
                    <Link href="/form" className="mr-4">Form</Link>
                    <Link href="/users">Users</Link>
                </div>
            </nav>
            <main className="p-4">{children}</main>
        </ThemeProvider>
        </body>
        </html>
    );
}
