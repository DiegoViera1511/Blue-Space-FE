import * as React from "react";

interface FullScreenContainerProps {
    children: React.ReactNode
}

export function FullScreenContainer({children}: FullScreenContainerProps) {
    return (
        <div className="flex flex-row items-center justify-center mt-12 w-full h-[85%]">
            {children}
        </div>
    )
}