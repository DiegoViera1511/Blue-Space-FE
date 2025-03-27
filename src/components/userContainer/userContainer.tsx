interface UserContainerProps {
    name: string
    cn?: string
    size?: "xs" | "sm" | "md" | "lg" 
}

export function UserContainer({name,cn,size}: UserContainerProps)
{
    enum containerHeightSize  {
        "xs" = "min-h-2",
        "sm" = "min-h-7",
        "md" = "min-h-8",
        "lg"= "min-h-10"
    }

    enum containerTextSize  {
        "xs" = "text-xs",
        "sm" = "text-sm",
        "md" = "text-md",
        "lg"= "text-lg",
    }
    
    return (
        <div
            className={`flex bg-gray-200 min-h-10 ${size ? containerHeightSize[size] : "" } aspect-square p-2 items-center 
            justify-center rounded-full ${cn}`}
        >
            <p className={`text-slate-500 ${size ? containerTextSize[size] : ""}`}>{name[0].toUpperCase()}</p>
        </div>
    )
}