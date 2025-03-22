import {CircleAlert, CircleX, CircleCheck, Info} from "lucide-react"
export interface InfoContainerProps2  {
    info: string,
    type: "info" | "warning" | "error" | "success" | "default"
    cn?: string
}

export enum InfoContainerTypes {
    DEFAULT = "default",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success"
}

export function InfoContainer2({info, type,cn}: InfoContainerProps2) {
    const colors = {
        [InfoContainerTypes.DEFAULT]: "bg-gray-100",
        [InfoContainerTypes.INFO]: "bg-blue-400",
        [InfoContainerTypes.WARNING]: "bg-yellow-400",
        [InfoContainerTypes.ERROR]: "bg-red-400",
        [InfoContainerTypes.SUCCESS]: "bg-green-400"
    };
    const simbols = {
        [InfoContainerTypes.DEFAULT]: <Info/>,
        [InfoContainerTypes.INFO]: <Info/>,
        [InfoContainerTypes.WARNING]: <CircleAlert/>,
        [InfoContainerTypes.ERROR]: <CircleX/>,
        [InfoContainerTypes.SUCCESS]: <CircleCheck/>
    }
    return (
        <div className={`flex flex-row items-center justify-start gap-2 p-2 rounded-md ${colors[type]} ${cn ?? ""}`}>
            {simbols[type]}
            <p>{info}</p>
        </div>
    )
}