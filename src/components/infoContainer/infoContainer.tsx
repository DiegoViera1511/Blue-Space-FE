interface InfoContainerProps {
    text: string
}

export function InfoContainer({text}: InfoContainerProps) {
    return (
        <div className="flex items-center justify-center shadow-md p-3 rounded-lg">
            <p className="text-4xl text-cyan-700 font-bold">
                {text}
            </p>
        </div>
    )
}