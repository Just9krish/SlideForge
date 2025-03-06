export interface Slide {
    id: string;
    slideName: string;
    type: string;
    content: Content;
    slideOrder: number;
    className?: string;
}

export interface Content {
    id: string;
    type: ContentType;
    name: string;
    content:
        | Content[]
        | string
        | string[]
        | string[][]
        | string[][][]
        | string[][][][]
        | string[][][][][];
    initialRows?: number;
    initialCols?: number;
    restrictToDrop?: boolean;
    columns?: number;
    placeholder?: string;
    className?: string;
    alt?: string;
    callOutTry?: 'success' | 'warning' | 'info' | 'question' | 'caution';
    link?: string;
    code?: string;
    language?: string;
    bgColor?: string;
    isTransparent?: boolean;
}

export type ContentType =
    | 'column'
    | 'resizable-column'
    | 'text'
    | 'paragraph'
    | 'image'
    | 'table'
    | 'multiColumn'
    | 'blank'
    | 'imageAndText'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'title'
    | 'table'
    | 'blackquote'
    | 'numberedList'
    | 'bulletedList'
    | 'code'
    | 'link'
    | 'qoute'
    | 'divider'
    | 'calloutBox'
    | 'todoList'
    | 'bulletList'
    | 'codeBlock'
    | 'customButton'
    | 'table'
    | 'tableOfContents';

export interface Theme {
    name: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    slideBackgroundColor: string;
    accentColor: string;
    gradientBackground?: string;
    sidebarColor?: string;
    navbarColor?: string;
    type: 'light' | 'dark';
}

export interface AlertState {
    isOpen: boolean;
    title: string;
    content: string;
    cancelText: string;
    confirmText: string;
    hideCancelButton: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    showAlert: (options: {
        title?: string;
        content?: string;
        cancelText?: string;
        confirmText?: string;
        hideCancelButton?: boolean;
        onConfirm?: () => void;
        onCancel?: () => void;
    }) => void;
    hideAlert: () => void;
}

export interface Prompt {
    id: string;
    createdAt: Date;
    title: string;
    outlines: OutlineCard[];
}

export interface OutlineCard {
    id: string;
    title: string;
    order: number;
}
