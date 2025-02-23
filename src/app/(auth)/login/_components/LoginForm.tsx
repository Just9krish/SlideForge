'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginInput, loginSchema } from '@/schema/auth.schema'
import { useState, useTransition } from 'react'
import { login } from '@/actions/auth.action'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/global/LoadingButton'

export default function LoginForm() {
    const [showTwoAuth, setTwoAuth] = useState(false)
    const [isPending, transitionStartFcn] = useTransition()

    const searchParams = useSearchParams()
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email is already in use with different provider!'
            : ''

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const onsubmit = (data: LoginInput) => {
        transitionStartFcn(() => {
            login(data)
                .then((data) => {
                    if (data.error) {
                        // form.reset();
                        toast.error(data.error)
                    }

                    if (data.success) {
                        form.reset()
                        toast.success(data.success)
                    }

                    if (data.twoAuth) {
                        setTwoAuth(true)
                    }
                })
                .catch(() => {
                    toast.error('Something went wrong!')
                })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                {showTwoAuth ? (
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel htmlFor="code">Code</FormLabel>
                                <FormControl>
                                    <Input
                                        id="code"
                                        {...field}
                                        placeholder="123456"
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    </>
                )}
                <LoadingButton className="w-full" loading={isPending}>
                    {showTwoAuth ? 'Confirm' : 'Login'}
                </LoadingButton>
            </form>
        </Form>
    )
}
