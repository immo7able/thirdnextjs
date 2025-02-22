'use client';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
    );
}

function LayoutContent({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <html lang="ru" className={theme}>
        <body className="transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
        <nav className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
            <div>
                <Link href="/" className="mr-4">Home</Link>
                <Link href="/form" className="mr-4">Form</Link>
                <Link href="/users">Users</Link>
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </button>
        </nav>
        <main className="p-4">{children}</main>
        </body>
        </html>
    );
}