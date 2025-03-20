interface UserContainerProps {
    name: string
}

export function UserContainer({name}: UserContainerProps) {
    return (
        <div
            className="flex bg-gray-200 min-h-10 max-h-12 aspect-square p-2 items-center justify-center rounded-full"
        >
            <p className="text-slate-500 cursor-pointer">{name[0].toUpperCase()}</p>
        </div>
    )
}