'use client';

import { useEffect } from 'react';
import { cn, timeAgo } from '@/lib/utils';
import { Themes } from '@/lib/constant';
import { containerItemVariants } from '@/lib/variants';
import { useSlideStore } from '@/store/useSlideStore';
import { JsonValue } from '@prisma/client/runtime/library';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ThumbnailPreview from './thumbnail-preview';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/store/useAlertDialogStore';
import { toast } from 'sonner';
import { deleteProject, recoverProject } from '@/actions/projects.action';

interface ProjectCardProps {
    projectId: string;
    title: string;
    isDeleted: boolean;
    createdAt: Date;
    src: string;
    slidesData: JsonValue;
    themeName: string;
}

export default function ProjectCard({
    projectId,
    title,
    isDeleted,
    createdAt,
    src,
    slidesData,
    themeName,
}: ProjectCardProps) {
    const { setSlides } = useSlideStore();
    const { showAlert, hideAlert } = useAlertStore();
    const router = useRouter();

    const handleClick = () => {
        setSlides(JSON.parse(JSON.stringify(slidesData)));
        router.push(`/presentation/${projectId}`);
    };

    const theme = Themes.find((theme) => theme.name === themeName);

    const handleRecover = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        showAlert({
            title: 'Confirm Recovery',
            content: 'Are you sure you want to recover this project?',
            onConfirm: async () => {
                try {
                    const response = await recoverProject(projectId);
                    if (response.error) {
                        toast.error(response.message);
                    } else {
                        toast.success(response.message);
                        router.refresh();
                    }
                } catch (error) {
                    console.error('Recovery failed:', error);
                    toast.error(
                        'Failed to recover the project. Please try again.'
                    );
                }
                hideAlert();
            },
            onCancel: () => {
                hideAlert();
            },
        });
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        showAlert({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this project?',
            onConfirm: async () => {
                try {
                    const data = await deleteProject(projectId);
                    if (data.error) {
                        toast.error(data.message);
                    } else {
                        toast.success(data.message);
                        router.refresh();
                    }
                } catch (error) {
                    console.error('Deletion failed:', error);
                    toast.error(
                        'Failed to delete the project. Please try again.'
                    );
                }
                hideAlert();
            },
            onCancel: () => {
                hideAlert();
            },
        });
    };

    return (
        <motion.div
            variants={containerItemVariants}
            className={cn(
                'w-full group flex flex-col gap-3 p-3 rounded-xl transition-colors',
                isDeleted && 'bg-muted/50'
            )}
        >
            <div
                className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                onClick={handleClick}
            >
                <ThumbnailPreview
                    theme={theme}
                    // WIP: Add preview of slides
                    // slide={JSON.parse(JSON.stringify(slidesData))[0]}
                />
            </div>
            <div className="w-full">
                <div className="space-y-1">
                    <h4 className="font-semibold text-base text-primary line-clamp-1">
                        {title}
                    </h4>
                    <div className="flex items-center justify-between gap-2 w-full">
                        <p className="text-sm text-muted-foreground">
                            {timeAgo(createdAt)}
                        </p>
                        {isDeleted ? (
                            <Button
                                variant="ghost"
                                className="bg-background/80 hover:bg-background/90"
                                size="sm"
                                onClick={handleRecover}
                            >
                                Recover
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="bg-background/80 hover:bg-background/90"
                                size="sm"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
