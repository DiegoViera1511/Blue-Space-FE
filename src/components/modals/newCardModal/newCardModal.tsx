import {useContext, useEffect, useState} from "react";
import {CardType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {httpRequest} from "../../../api";
import {AlignLeft, X} from "lucide-react";

interface NewCardModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    position: number
}

export function NewCardModal({open, setOpen, position}: NewCardModalProps) {
    const [newCardName, setNewCardName] = useState('')
    const [newCardText, setNewCardText] = useState('')
    const [addText , setAddText] = useState(false)

    const {selectedState, handleRefreshState} = useContext(StatesContext)

    useEffect(() => {
        setNewCardName('')
        setNewCardText('')
        setAddText(false)
    }, [position,open]);

    const handleCreateCard = async () => {
        const newCard: Partial<CardType> = {
            position: position,
            title: newCardName,
            text: newCardText,
            state_id: selectedState.id
        }
        await httpRequest({
            url: '/card',
            method: 'POST',
            data: newCard
        })
            .then(() => {
                setOpen(false)
                handleRefreshState()
            })
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[280px] h-fit sm:w-[500px] "}
            >
                <div className={"flex flex-row items-center justify-between"}>
                    <p className={"text-xl font-medium"}>New Card</p>
                    <p className={"text-xl font-medium"}>State: {selectedState.name} </p>
                </div>
                <div className={"flex flex-col w-full gap-4 rounded"}>
                    <input 
                        type="text" 
                        placeholder={"Card title"}
                        className={" text-sm sm:text-lg p-3 outline-none bg-gray-100 rounded-xl"}
                        value={newCardName}
                        onChange={(e) => setNewCardName(e.target.value)}
                    />
                    {
                        addText ? 
                            <>
                                <div className={"flex flex-row gap-2 rounded items-center justify-between"}>
                                    <div className={"flex flex-row gap-2 rounded items-center justify-start"}>
                                        <p className={"text-xl"}>Description</p>
                                        <AlignLeft/>
                                    </div>
                                    <div 
                                        className={"flex items-center justify-center p-1 hover:bg-gray-100 rounded-md"}
                                        onClick={() => setAddText(false)}
                                    >
                                        <X/>
                                    </div>
                                </div>
                                <textarea
                                    placeholder={"Card text"}
                                    className={"text-sm sm:text-lg p-3 outline-none bg-gray-100 rounded-xl h-[150px] sm:h-[250px] resize-none overflow-y-auto"}
                                    value={newCardText}
                                    onChange={(e) => setNewCardText(e.target.value)}
                                />
                            </>
                            :
                            <SimpleButton onClick={() => setAddText(true)} text={"Add Description"} icon={<AlignLeft/>} cn={"w-fit hover:bg-gray-100"} />
                    }
                    <hr/>
                    <div className={"flex flex-row gap-2 items-center justify-start"}>
                        <SimpleButton
                            onClick={() => setOpen(false)}
                            text={"Cancel"}
                            cn={"hover:bg-gray-100"}
                        />
                        <SimpleButton
                            onClick={() => handleCreateCard()}
                            text={"Create"}
                            cn={"hover:bg-gray-100 hover:text-green-500"}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}