import {useContext, useState} from "react";
import {CardType} from "../../types.ts";
import {InfoCardModal} from "../modals/infoCardModal/infoCardModal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";
import {useDraggable} from "@dnd-kit/core";
import {GripVertical} from "lucide-react";

export function Card({cardProps}: { cardProps: CardType }) {
    const {
        setSelectedCard,
    } = useContext(StatesContext)

    const [openInfoCardModal, setOpenInfoCardModal] = useState(false)

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: cardProps.id,
        data: {...cardProps}
    })

    const style = transform ?
        {
            opacity: 0.3
        }
        :
        undefined

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className="flex w-[98%] min-h-10 h-auto bg-white 
                border shadow border-gray-400 px-2 py-2 text-ellipsis 
                overflow-hidden rounded-lg cursor-pointer justify-between"
                onClick={() => {
                    setSelectedCard(cardProps)
                    setOpenInfoCardModal(true)
                }}
            >
                <p>{cardProps.title}</p>
                <div
                    {...attributes}
                    {...listeners}
                    className={"hover:cursor-grab"}
                >
                    <GripVertical className={"text-gray-400"}/>
                </div>
            </div>
            <InfoCardModal open={openInfoCardModal} setOpen={setOpenInfoCardModal}/>
        </>
    )
}