function LoadingButton({ text, styles, svg }: { text?: string; styles?: string; svg?: string }) {
    return (
        <button
            type="button"
            className={`flex cursor-not-allowed items-center rounded-lg ${styles}`}
            disabled
        >
            <svg
                className={`mr-2 animate-spin ${svg || "h-5 w-5 text-white"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            <span className="font-medium">{text}</span>
        </button>
    );
}

export default LoadingButton;
