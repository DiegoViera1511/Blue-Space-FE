import {useContext} from "react";
import {CardType} from "../../types.ts";
import {InfoCardModal} from "../modals/infoCardModal/infoCardModal.tsx";
import {Modal} from "../common/modal/modal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";

export function Card({cardProps}: { cardProps: CardType }) {
    const {
        setSelectedCard,
        setOpenInfoCardModal,
        openInfoCardModal
    } = useContext(StatesContext)

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
            <Modal open={openInfoCardModal} onClose={() => setOpenInfoCardModal(false)}>
                <InfoCardModal/>
            </Modal>
        </>
    )
}