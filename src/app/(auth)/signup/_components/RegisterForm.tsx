'use client';

import { register } from '@/actions/auth.action';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterInput, registerSchema } from '@/schema/auth.schema';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/global/LoadingButton';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterForm() {
    const [isPending, transitionStartFcn] = useTransition();

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onsubmit = (data: RegisterInput) => {
        transitionStartFcn(() => {
            register(data).then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }

                if (data.success) {
                    form.reset();
                    toast.success(data.success);
                }
            });
        });
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="space-y-4"
                action=""
            >
                <div className="flex items-center gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1 space-y-2">
                                <FormLabel htmlFor="firstName">
                                    First Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="firstName"
                                        placeholder="John"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1 space-y-2">
                                <FormLabel htmlFor="lastName">
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="lastName"
                                        placeholder="Cena"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex w-full items-center gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1 space-y-2">
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
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel htmlFor="password">Password</FormLabel>
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel htmlFor="confirmPassword">
                                Confirm Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="confirmPassword"
                                    placeholder="******"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                            <Checkbox
                                id="isTwoFactorEnabled"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="accent-black"
                            />
                            <FormLabel className="!mt-0" htmlFor="isTwoFactorEnabled">
                                Enable 2FA
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <LoadingButton className="w-full" loading={isPending}>
                    Create an account
                </LoadingButton>
            </form>
        </Form>
    );
}
