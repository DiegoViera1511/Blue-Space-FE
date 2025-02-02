import {useContext, useEffect, useState} from "react";
import {Trash2} from "lucide-react";
import {defaultCardType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {EditableText} from "../../common/editableText/editableText.tsx";
import {EditableTextArea} from "../../common/editableTextArea/editableTextArea.tsx";
import {ChangeCardState} from "./changeCardState.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";
import {Modal} from "../../common/modal/modal.tsx";

export interface InfoCardModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function InfoCardModal({open , setOpen}: InfoCardModalProps) {

    const {
        selectedCard,
        setSelectedCard,
        setOpenInfoCardModal,
        handleRefreshState
    } = useContext(StatesContext)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(selectedCard.title)
    const [newCardText, setNewCardText] = useState(selectedCard.text)

    const handleSaveEdit = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: newCardText})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data)
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    const handleSaveEditTitle = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: newCardTitle})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data)
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setSelectedCard(defaultCardType)
                setOpenInfoCardModal(false)
                setOpenDeleteModal(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setNewCardText(selectedCard.text)
        setNewCardTitle(selectedCard.title)
    }, [selectedCard]);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 overflow-y-auto justify-start text-sm w-[280px] h-fit max-h-[400px] sm:max-h-[550px] sm:w-[500px] "}
            >
                <EditableText
                    onBlur={() => handleSaveEditTitle()}
                    value={newCardTitle}
                    onChange={setNewCardTitle}
                    text={selectedCard.title}
                />
                <hr/>
                <ChangeCardState
                    onClick={() => setOpenDeleteModal(false)}
                />
                <EditableTextArea
                    value={newCardText}
                    setNewText={setNewCardText}
                    text={selectedCard.text}
                    handleSaveEdit={() => handleSaveEdit()}
                />


                <SimpleButton
                    onClick={() => setOpenDeleteModal(true)}
                    text={"Delete"}
                    cn={"text-red-500 bg-gray-100"}
                    icon={<Trash2/>}
                />

                <DeleteWarningModal
                    open={openDeleteModal}
                    setOpen={setOpenDeleteModal}
                    objectName={selectedCard.title}
                    objectType={"Card"}
                    handleDelete={() => handleDelete()}
                />

            </div>
        </Modal>
    )
}