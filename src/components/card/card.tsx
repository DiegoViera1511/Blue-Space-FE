import {useContext, useState} from "react";
import {CardType} from "../../types.ts";
import {InfoCardModal} from "../modals/infoCardModal/infoCardModal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";
import {AlignLeft, GripVertical} from "lucide-react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {UserContainer} from "../userContainer/userContainer.tsx";

export function Card({cardProps}: { cardProps: CardType }) {
    const {
        setSelectedCard,
        activeId
    } = useContext(StatesContext)
    
    const [openInfoCardModal, setOpenInfoCardModal] = useState(false)

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
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
                className={`flex w-full min-h-10 h-fit border-2 border-white hover:border-gray-400 bg-white shadow-sm p-2 text-ellipsis
                overflow-hidden rounded-lg cursor-pointer gap-1 items-center justify-between ${activeId === cardProps.id ? "opacity-0" : ""}`}
                onClick={() => {
                    setSelectedCard(cardProps)
                    setOpenInfoCardModal(true)
                }}
            >
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex flex-row items-center gap-2 justify-start"}>
                        {
                            cardProps.user_card ?
                                <UserContainer name={cardProps.user_card} cn={"min-h-2"} size={"xs"}/>
                                :
                                <></>
                        }
                        {cardProps.text === "" ?
                            <></>
                            :
                            <AlignLeft size={15} />
                        }
                    </div>
                    <p className={"text-gray-700"}>{cardProps.title}</p>
                </div> 
                <div
                    {...attributes}
                    {...listeners}
                    className={"flex hover:cursor-grab items-center justify-center"}
                >
                    <GripVertical className={"text-gray-400"}/>
                </div>
            </div>
            <InfoCardModal open={openInfoCardModal} setOpen={setOpenInfoCardModal}/>
        </>
    )
}