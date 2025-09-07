'use client';

import Image from "next/image";
import PrimaryButton from "@/components/common/PrimaryButton";
import InputField from "@/components/common/InputField";
import Link from "next/link";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../features/auth/authSlice';
import { login } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const dispatch = useDispatch();

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: ({ email, password }: LoginForm) => login(email, password),
        onSuccess: (data) => {
            dispatch(loginAction(data));
            router.push('/');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            alert(error.message);
        },
    });

    const onSubmit = (data: LoginForm) => mutation.mutate(data);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-10 md:p-12 border border-gray-700/50">
                {/* Logo + Heading */}
                <div className="flex flex-col items-center mb-10">
                    <Link href="" className="flex items-center text-2xl font-bold text-white mb-5">
                        <Image
                            width={100}
                            height={100}
                            className="w-20 h-20 mr-2"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                            alt="logo"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold text-white text-center">Welcome back</h1>
                    <p className="text-base text-gray-400 mt-3 text-center">Please sign in to continue</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>

                    <InputField {...register('email')} id="email" type="email" label="Email address" placeholder="you@example.com" required />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <InputField {...register('password')} id="password" type="password" label="Password" placeholder="••••••••" required />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-blue-500"
                            />
                            Remember me
                        </label>
                        <Link href="#" className="font-medium text-blue-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <PrimaryButton className="py-2 rounded-xl text-lg" type="submit">Login</PrimaryButton>

                    <p className="text-base text-center text-gray-400">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="font-medium text-blue-400 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
