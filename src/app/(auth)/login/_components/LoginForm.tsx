'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/schema/auth.schema';
import { useState, useTransition } from 'react';
import { login } from '@/actions/auth.action';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/global/LoadingButton';

export default function LoginForm() {
    const [showTwoAuth, setShowTwoAuth] = useState(false);
    const [isPending, transitionStartFcn] = useTransition();
    const [email, setEmail] = useState(''); // Store email for 2FA

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onsubmit = (data: LoginInput) => {
        // Store email when first submitting for 2FA
        if (!showTwoAuth) {
            setEmail(data.email);
        }

        transitionStartFcn(() => {
            login(data)
                .then((data) => {
                    if ('error' in data) {
                        toast.error(data.error);
                    } else if ('success' in data) {
                        form.reset();
                        setShowTwoAuth(false);
                        setEmail('');
                        toast.success(data.success);
                    } else if ('twoAuth' in data) {
                        setShowTwoAuth(true);
                        toast.info('Please enter your 2FA code');
                    }
                })
                .catch(() => {
                    toast.error('Something went wrong!');
                });
        });
    };

    const handleBackToLogin = () => {
        setShowTwoAuth(false);
        setEmail('');
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                {showTwoAuth ? (
                    <>
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Enter the 6-digit code sent to:
                            </p>
                            <p className="font-medium">{email}</p>
                        </div>
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="code">
                                        2FA Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="code"
                                            {...field}
                                            placeholder="123456"
                                            type="number"
                                            maxLength={6}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleBackToLogin}
                                className="flex-1 px-4 py-2 text-sm border border-input rounded-md hover:bg-accent"
                            >
                                Back to Login
                            </button>
                            <LoadingButton
                                className="flex-1"
                                loading={isPending}
                            >
                                Confirm
                            </LoadingButton>
                        </div>
                    </>
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="m@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <div className="flex items-center">
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <Link
                                            className="ml-auto inline-block text-sm underline"
                                            href="/reset"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            placeholder="******"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton className="w-full" loading={isPending}>
                            Login
                        </LoadingButton>
                    </>
                )}
            </form>
        </Form>
    );
}
