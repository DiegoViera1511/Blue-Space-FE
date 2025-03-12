import {useContext, useState} from "react";
import {CardType} from "../../types.ts";
import {InfoCardModal} from "../modals/infoCardModal/infoCardModal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";
import {GripVertical} from "lucide-react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export function Card({cardProps}: { cardProps: CardType }) {
    const {
        setSelectedCard,
        activeId
    } = useContext(StatesContext)

    const [openInfoCardModal, setOpenInfoCardModal] = useState(false)
    
    const {attributes, listeners, setNodeRef, transform,transition} = useSortable({
        id: cardProps.id,
        data: {...cardProps}
    })

    const style = transform ?
        {
            transform: CSS.Transform.toString(transform),
            transition,
        }
        :
        undefined

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className={`flex w-[98%] min-h-10 h-auto bg-white 
                border shadow border-gray-400 px-2 py-2 text-ellipsis 
                overflow-hidden rounded-lg cursor-pointer justify-between ${activeId === cardProps.id ? "opacity-0" : ""}`}
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