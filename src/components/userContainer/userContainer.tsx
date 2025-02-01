interface UserContainerProps {
    name: string
    onClick: () => void
}

export function UserContainer({name, onClick}: UserContainerProps) {
    return (
        <div
            className="flex bg-gray-200 w-12 h-12 items-center justify-center rounded-full"
            onClick={onClick}
        >
            <p className="text-slate-500 cursor-pointer">{name[0].toUpperCase()}</p>
        </div>
    )
}