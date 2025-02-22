'use client';

import { useEffect, useState } from 'react';

function LoadingPage() {
    return <p className="text-center text-lg">Загрузка...</p>;
}

function ErrorPage({ message }) {
    return <p className="text-center text-red-500">Ошибка: {message}</p>;
}

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError('Превышено время ожидания');
            setLoading(false);
        }, 10000);

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                clearTimeout(timeout);
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                clearTimeout(timeout);
                setError(error.message);
                setLoading(false);
            });

        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <LoadingPage />;
    if (error) return <ErrorPage message={error} />;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="p-2 border-b border-gray-300 dark:border-gray-700">
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
