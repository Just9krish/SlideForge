import { AlertState } from '@/lib/types';
import { create } from 'zustand';

const useAlertStore = create<AlertState>((set) => ({
    isOpen: false,
    title: '',
    content: '',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    hideCancelButton: false,
    onConfirm: undefined,
    onCancel: undefined,
    showAlert: (options) =>
        set(() => ({
            isOpen: true,
            title: options.title || 'Are you absolutely sure?',
            content: options.content || '',
            cancelText: options.cancelText || 'Cancel',
            confirmText: options.confirmText || 'Confirm',
            hideCancelButton: options.hideCancelButton || false,
            onConfirm: options.onConfirm,
            onCancel: options.onCancel,
        })),
    hideAlert: () =>
        set(() => ({
            isOpen: false,
            title: '',
            content: '',
            cancelText: 'Cancel',
            confirmText: 'Confirm',
            hideCancelButton: false,
            onConfirm: undefined,
            onCancel: undefined,
        })),
}));

export default useAlertStore;
