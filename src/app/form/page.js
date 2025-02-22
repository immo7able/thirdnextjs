'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {useTheme} from "@/context/ThemeContext";

const schema = z
    .object({
        firstName: z.string().min(3, 'Не менее 3 символов').regex(/^[A-Za-zА-Яа-я]+$/, 'Только буквы'),
        lastName: z.string().min(3, 'Не менее 3 символов').regex(/^[A-Za-zА-Яа-я]+$/, 'Только буквы'),
        email: z.string().email('Неверный формат email'),
        age: z.coerce.number().min(18, 'Возраст должен быть от 18').max(99, 'Возраст должен быть до 99'),
        password: z
            .string()
            .min(8, 'Минимум 8 символов')
            .regex(/[A-Z]/, 'Должна быть заглавная буква')
            .regex(/\d/, 'Должна быть цифра')
            .regex(/\W/, 'Должен быть спецсимвол'),
        confirmPassword: z.string(),
        phone: z.string().regex(/^\+?\d{10,}$/, 'Неверный формат номера телефона'),
        terms: z.boolean().refine(value => value === true, 'Необходимо согласие с правилами'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export default function FormPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const { theme } = useTheme();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        setSubmitted(true);
        reset();
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-4">Форма регистрации</h1>
            {submitted && <p className="text-green-600">Форма успешно отправлена!</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <input {...register('firstName')} placeholder="Имя" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                    <input {...register('lastName')} placeholder="Фамилия" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>

                <div className="space-y-2">
                    <input {...register('email')} placeholder="Email" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <input type="number" {...register('age')} placeholder="Возраст" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                </div>

                <div className="space-y-2">
                    <input type="password" {...register('password')} placeholder="Пароль" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                    <input type="password" {...register('confirmPassword')} placeholder="Подтвердите пароль" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <div className="space-y-2">
                    <input {...register('phone')} placeholder="Телефон" className="input block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg" />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center">
                        <input type="checkbox" {...register('terms')} className="mr-2" /> Согласие с правилами
                    </label>
                    {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">Отправить</button>
            </form>
        </div>
    );
}
