interface UserContainerProps {
    name: string
    cn?: string
    size?: "xs" | "sm" | "md" | "lg" 
}

export function UserContainer({name,cn,size}: UserContainerProps)
{
    enum containerSize  {
        "xs" = 2,
        "sm" = 7,
        "md" = 8,
        "lg"= 10
    }
    
    return (
        <div
            className={`flex bg-gray-200 min-h-10 ${size ? "min-h-" + containerSize[size] : "" } aspect-square p-2 items-center 
            justify-center rounded-full ${cn}`}
        >
            <p className={`text-slate-500 ${size ? "text-" + size : ""}`}>{name[0].toUpperCase()}</p>
        </div>
    )
}