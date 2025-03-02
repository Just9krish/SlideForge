import { Slide, Theme } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Image } from 'lucide-react';

interface ThumbnailPreviewProps {
    slide: Slide;
    theme: Theme;
}

export default function ThumbnailPreview({
    slide,
    theme,
}: ThumbnailPreviewProps) {
    // WIP: Add preview of slides
    return (
        <div
            className={cn(
                'w-full relative aspect-video rounded-lg overflow-hidden transition-all duration-200 p-2'
            )}
            style={{
                fontFamily: theme.fontFamily,
                backgroundColor: theme.slideBackgroundColor,
                color: theme.fontColor,
                backgroundImage: theme.gradientBackground,
            }}
        >
            {slide ? (
                <div className="scale-50 origin-top-left w-[200%] h-[200%] overflow-hidden">
                    this is slides
                </div>
            ) : (
                <div className="h-full w-full bg-gray-400 flex justify-center items-center">
                    <Image className="size-6 text-gray-500" />
                </div>
            )}
        </div>
    );
}
