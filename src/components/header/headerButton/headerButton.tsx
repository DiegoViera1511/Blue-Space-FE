interface HeaderButtonProps {
    text?: string,
    icon?: JSX.Element
    onClick: () => void
}

export function HeaderButton({text, icon, onClick}: HeaderButtonProps) {
    return (
        <button className="flex flex-row items-center justify-center text-cyan-700 text-xl md:text-2xl"
                onClick={onClick}
        >
            {text}
            {icon}
        </button>
    )

}