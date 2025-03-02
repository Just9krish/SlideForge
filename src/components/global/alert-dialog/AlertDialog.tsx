'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlertStore } from '@/store/useAlertDialogStore';

export default function AlertDialogComponent() {
    const {
        isOpen,
        title,
        content,
        cancelText,
        confirmText,
        hideCancelButton,
        onConfirm,
        onCancel,
        hideAlert,
    } = useAlertStore();

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        hideAlert();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        hideAlert();
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="w-[90%] max-w-lg">
                <AlertDialogHeader className="mb-6">
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{content}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                    {!hideCancelButton && (
                        <AlertDialogCancel onClick={handleCancel}>
                            {cancelText}
                        </AlertDialogCancel>
                    )}
                    <AlertDialogAction onClick={handleConfirm}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
