'use client';

import { useTheme } from "@/context/ThemeContext";

export default function HomePage() {
    const { theme } = useTheme();

    return (
        <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-black dark:text-white`}>
            <h1 className="text-3xl font-bold">Добро пожаловать!</h1>
            <p className="text-lg text-center">Приложение для регистрации и загрузки пользователей.</p>
        </div>
    );
}
