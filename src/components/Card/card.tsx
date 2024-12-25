import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";

export function Card({title}){
    const {
        setOpenInfoCardModal,
    } = useContext(UserContext)
    return(
        <div
            className="flex w-[98%] min-h-10 h-auto bg-white 
            border shadow border-gray-400 px-2 py-2 text-ellipsis 
            overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setOpenInfoCardModal(true)}
        >
            <p>{title}</p>
        </div>
    )
}