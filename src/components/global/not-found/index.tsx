import { BrandLogo } from '@/assets/icons';

interface NotfoundProps {
    title: string;
    description: string;
}

export default function Notfound({ title, description }: NotfoundProps) {
    return (
        <div className="flex justify-center items-center min-h-[70vh] w-full flex-col gap-8">
            <BrandLogo className="size-32" />
            <div className="flex flex-col justify-center items-center text-center">
                <p className="text-3xl font-semibold text-primary">{title}</p>
                <p className="text-muted-foreground font-normal text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}
