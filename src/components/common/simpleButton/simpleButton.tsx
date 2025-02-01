interface SimpleButtonProps {
    onClick: () => void,
    text: string
    cn?: string
    icon?: JSX.Element
    type?: "button" | "submit" | "reset"
}

export function SimpleButton({onClick, text, cn, icon, type = "button"}: SimpleButtonProps) {
    return (
        <button
            className={`flex flex-row gap-4 items-center justify-center border-2 rounded-lg p-2 ${cn}`}
            onClick={onClick}
            type={type}
        >
            {text}
            {icon ? icon : <></>}
        </button>
    )
}