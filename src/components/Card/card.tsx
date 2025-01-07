import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {CardType} from "../../types.ts";

export function Card({cardProps} : {cardProps: CardType}){
    const {
        setOpenInfoCardModal,
        setSelectedCard
    } = useContext(UserContext)
    return(
        <div
            className="flex w-[98%] min-h-10 h-auto bg-white 
            border shadow border-gray-400 px-2 py-2 text-ellipsis 
            overflow-hidden rounded-lg cursor-pointer"
            onClick={() => {
                setSelectedCard(cardProps)
                setOpenInfoCardModal(true)
            }}
        >
            <p>{cardProps.title}</p>
        </div>
    )
}