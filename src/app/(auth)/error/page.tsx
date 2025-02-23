import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <Card className="mx-auto max-w-sm border">
            <CardHeader>Opps! Something went wrong!</CardHeader>
            <CardFooter>
                <Link href={'/login'}>Back to login</Link>
            </CardFooter>
        </Card>
    )
}
