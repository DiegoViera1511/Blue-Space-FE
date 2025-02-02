import {useContext, useEffect, useState} from "react";
import {CardType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";

interface NewCardModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    position: number
}

export function NewCardModal({open, setOpen, position}: NewCardModalProps) {
    const [newCardName, setNewCardName] = useState('')
    const [newCardText, setNewCardText] = useState('')

    const {selectedState, handleRefreshState} = useContext(StatesContext)

    useEffect(() => {
        setNewCardName('')
        setNewCardText('')
    }, [position]);

    const handleCreateCard = () => {
        const newCard: Partial<CardType> = {
            position: position,
            title: newCardName,
            text: newCardText,
            state_id: selectedState.id
        }
        fetch(`http://localhost:8080/api/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCard)
        })
            .then(response => response.json())
            .then(() => {
                setOpen(false)
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[280px] h-fit sm:w-[500px] "}
            >
                <div className={"flex flex-row items-center justify-between"}>
                    <p className={"text-xl font-bold"}>New Card</p>
                    <p className={"text-xl font-bold"}>State: {selectedState.name} </p>
                </div>
                <hr/>
                <div className={"flex flex-col w-full gap-4 rounded p-3"}>
                    <p className={"text-xl"}>Title</p>
                    <input type="text" placeholder={"Card title"}
                           className={" text-sm sm:text-lg p-2 border border-gray-400 rounded"}
                           value={newCardName}
                           onChange={(e) => setNewCardName(e.target.value)}
                    />
                    <p className={"text-xl"}>Description</p>
                    <textarea
                        placeholder={"Card text"}
                        className={"text-sm sm:text-lg p-2 border border-gray-400 rounded h-[150px] sm:h-[250px] resize-none overflow-y-auto"}
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                    />
                    <div className={"flex flex-row gap-4 items-center justify-center"}>
                        <SimpleButton
                            onClick={() => setOpen(false)}
                            text={"Cancel"}
                            cn={"bg-gray-100"}
                        />
                        <SimpleButton
                            onClick={() => handleCreateCard()}
                            text={"Create"}
                            cn={"bg-gray-100 text-green-500"}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}