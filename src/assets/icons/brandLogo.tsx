export default function brandLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x="6"
                y="6"
                width="52"
                height="52"
                rx="8"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                d="M20 22 C20 16, 44 16, 44 22 C44 28, 20 28, 20 34 C20 40, 44 40, 44 46"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
