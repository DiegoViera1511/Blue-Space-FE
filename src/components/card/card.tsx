import {useContext, useState} from "react";
import {CardType} from "../../types.ts";
import {InfoCardModal} from "../modals/infoCardModal/infoCardModal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";

export function Card({cardProps}: { cardProps: CardType }) {
    const {
        setSelectedCard,
    } = useContext(StatesContext)
    
    const [openInfoCardModal , setOpenInfoCardModal] = useState(false)
    
    return (
        <>
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
            <InfoCardModal open={openInfoCardModal} setOpen={setOpenInfoCardModal}/>
        </>
    )
}